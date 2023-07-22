import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { ScheduledEmail } from '@prisma/client'
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'
import * as dayjs from 'dayjs'
import { PrismaService } from '~/prisma/prisma.service'
import { CreateScheduleEmailDto } from './schedule-email.dto'
import { SanitizedUser } from '~/user/user.types'
import { MAX_SCHEDULE_MAIL_ALLOWED } from '~/config/constants'
import { MailerService } from '~/mailer/mailer.service'

@Injectable()
export class ScheduleEmailService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly mailerService: MailerService,
  ) {}

  findAll(user: SanitizedUser): Promise<ScheduledEmail[]> {
    return this.prismaService.scheduledEmail.findMany({ where: { createdById: user.id } })
  }

  async scheduleEmail(dto: CreateScheduleEmailDto, user: SanitizedUser): Promise<ScheduledEmail> {
    try {
      const createdJobs = await this.prismaService.scheduledEmail.count({ where: { createdById: user.id } })
      if (createdJobs >= MAX_SCHEDULE_MAIL_ALLOWED) {
        throw new BadRequestException('You have reached the maximum number of scheduled emails!')
      }

      const job = await this.prismaService.scheduledEmail.create({
        data: {
          to: dto.to,
          type: dto.type,
          title: dto.title,
          description: dto.description,
          scheduledTime: dto.scheduledTime,
          template: { connect: { id: dto.template } },
          createdBy: { connect: { id: user.id } },
        },
      })

      const newJob = new CronJob(
        dayjs(dto.scheduledTime).toDate(),
        async () => {
          await this.mailerService.sendScheduledMail(job.to, job.templateId, user)
        },
        () => {
          Logger.log('Cron job completed!')
        },
      )

      this.schedulerRegistry.addCronJob(job.id, newJob)
      newJob.start()

      return job
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong!')
    }
  }

  async findOneById(id: string): Promise<ScheduledEmail> {
    const schedule = await this.prismaService.scheduledEmail.findFirst({ where: { id } })
    if (!schedule) {
      throw new NotFoundException('No schedule email found for specified id.')
    }
    return schedule
  }

  getScheduledEmails(user: SanitizedUser): Promise<ScheduledEmail[]> {
    return this.prismaService.scheduledEmail.findMany({ where: { createdById: user.id } })
  }

  async deleteOneBydId(id: string, user: SanitizedUser): Promise<ScheduledEmail> {
    const schedule = await this.findOneById(id)
    if (schedule.createdById !== user.id) {
      throw new BadRequestException('You are not authorized to delete this schedule.')
    }

    const job = this.schedulerRegistry.getCronJob(id)
    if (job) {
      job.stop()
      this.schedulerRegistry.deleteCronJob(id)
    }

    return this.prismaService.scheduledEmail.delete({ where: { id } })
  }

  getTotalScheduledEmails(user: SanitizedUser): Promise<number> {
    return this.prismaService.scheduledEmail.count({ where: { createdById: user.id } })
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  deleteAlreadyRunCrons() {
    Logger.log('Deleting already run crons', ScheduleEmailService.name)

    const jobs = this.schedulerRegistry.getCronJobs()
    jobs.forEach(async (job, key) => {
      const scheduledEmail = await this.prismaService.scheduledEmail.findUnique({ where: { id: key } })
      if (scheduledEmail.type === 'FIXED_TIME') {
        try {
          job.nextDates().toJSDate()
        } catch (error) {
          /** If job is already fired, nextDates() wil throw an error */
          Logger.log(`Deleting already run cron ${key}`, ScheduleEmailService.name)
          this.schedulerRegistry.deleteCronJob(key)
          await this.prismaService.scheduledEmail.delete({ where: { id: key } })
        }
      }
    })
  }
}
