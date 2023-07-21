import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { ApiKey, Email, Template } from '@prisma/client'
import Handlebars from 'handlebars'
import { SendMailDto } from './mailer.dto'
import { SanitizedUser } from '~/user/user.types'
import { TemplateService } from '~/template/template.service'
import { generateRegisteredUserMailContent, mailBridgeSignature } from './mailer.utils'
import { ApiKeyService } from '~/api-key/api-key.service'
import { PrismaService } from '~/prisma/prisma.service'
import { USER_SELECT_FIELDS } from '~/user/user.fields'

@Injectable()
export class MailerService {
  constructor(
    @Inject('MAIL_TRANSPORTER') private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
    private readonly templateService: TemplateService,
    private readonly apiKeyService: ApiKeyService,
    private readonly prismaService: PrismaService,
  ) {}

  async sendMail(dto: SendMailDto, user: SanitizedUser, apiKey: ApiKey, templateId?: string) {
    const to = dto.data.email
    if (!to) {
      throw new BadRequestException('Email not provided in data.')
    }

    let template: Template
    if (templateId) {
      template = await this.templateService.findOneByTemplateId(templateId)
    } else {
      template = await this.templateService.findDefaultForUser(user.id)
    }

    const compiled = Handlebars.compile(template.content)
    const html = compiled(dto.data)
    const htmlWithSignature = this.addMailBridgeSignature(html)

    /** Sending mail to the user 1 */
    this.transporter.sendMail(
      {
        from: user.email,
        to,
        subject: template.subject,
        html: htmlWithSignature,
      },
      async (error) => {
        if (error) {
          throw new InternalServerErrorException(error)
        }
        await this.apiKeyService.increaseUsageCount(apiKey.id)
        await this.prismaService.email.create({
          data: {
            content: html,
            data: dto.data,
            from: user.email,
            to,
            createdBy: { connect: { id: user.id } },
          },
        })
      },
    )

    /** Sending confirmation mail to our registered user */
    const registeredUserContent = generateRegisteredUserMailContent(user, apiKey.name, dto.data)
    const contentWithSignature = this.addMailBridgeSignature(registeredUserContent)
    this.transporter.sendMail(
      {
        from: user.email,
        to: user.email,
        subject: `You have received an email on ${apiKey.name}`,
        html: contentWithSignature,
      },
      (error) => {
        if (error) {
          throw new InternalServerErrorException(error)
        }
      },
    )

    return { status: 'SUCCESS' }
  }

  private addMailBridgeSignature(html: string): string {
    return html + mailBridgeSignature
  }

  getTotalEmailSent(user: SanitizedUser): Promise<number> {
    return this.prismaService.email.count({ where: { createdById: user.id } })
  }

  getMails(user: SanitizedUser): Promise<Email[]> {
    return this.prismaService.email.findMany({
      where: { createdById: user.id },
      include: { createdBy: { select: USER_SELECT_FIELDS } },
    })
  }

  async sendScheduledMail(to: string[], templateId: string, user: SanitizedUser) {
    const template = await this.templateService.findOneById(templateId, user.id)
    this.transporter.sendMail({
      from: user.email,
      to,
      subject: template.subject,
      html: template.content,
    })
  }
}
