import { Module } from '@nestjs/common'
import { ScheduleEmailController } from './schedule-email.controller'
import { ScheduleEmailService } from './schedule-email.service'
import { MailerModule } from '~/mailer/mailer.module'

@Module({
  imports: [MailerModule],
  controllers: [ScheduleEmailController],
  providers: [ScheduleEmailService],
  exports: [ScheduleEmailService],
})
export class ScheduleEmailModule {}
