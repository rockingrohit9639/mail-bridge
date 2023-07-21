import { Body, Controller, Post } from '@nestjs/common'
import { ScheduledEmail } from '@prisma/client'
import { ScheduleEmailService } from './schedule-email.service'
import { CreateScheduleEmailDto } from './schedule-email.dto'
import { GetUser } from '~/auth/user.decorator'
import { SanitizedUser } from '~/user/user.types'

@Controller('schedule-email')
export class ScheduleEmailController {
  constructor(private readonly scheduleEmailService: ScheduleEmailService) {}

  @Post()
  scheduleEmail(@Body() dto: CreateScheduleEmailDto, @GetUser() user: SanitizedUser): Promise<ScheduledEmail> {
    return this.scheduleEmailService.scheduleEmail(dto, user)
  }
}
