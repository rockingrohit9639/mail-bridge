import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ScheduledEmail } from '@prisma/client'
import { ScheduleEmailService } from './schedule-email.service'
import { CreateScheduleEmailDto } from './schedule-email.dto'
import { GetUser } from '~/auth/user.decorator'
import { SanitizedUser } from '~/user/user.types'
import { JwtGuard } from '~/auth/jwt/jwt.guard'

@UseGuards(JwtGuard)
@Controller('schedule-email')
export class ScheduleEmailController {
  constructor(private readonly scheduleEmailService: ScheduleEmailService) {}

  @Post()
  scheduleEmail(@Body() dto: CreateScheduleEmailDto, @GetUser() user: SanitizedUser): Promise<ScheduledEmail> {
    return this.scheduleEmailService.scheduleEmail(dto, user)
  }

  @Get()
  getScheduledEmails(@GetUser() user: SanitizedUser): Promise<ScheduledEmail[]> {
    return this.scheduleEmailService.getScheduledEmails(user)
  }

  @Delete(':id')
  deleteSchedule(@Param('id') id: string, @GetUser() user: SanitizedUser): Promise<ScheduledEmail> {
    return this.scheduleEmailService.deleteOneBydId(id, user)
  }
}
