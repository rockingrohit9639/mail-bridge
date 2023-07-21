import { Module } from '@nestjs/common'
import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'
import { MailerModule } from '~/mailer/mailer.module'
import { TemplateModule } from '~/template/template.module'
import { ScheduleEmailModule } from '~/schedule-email/schedule-email.module'

@Module({
  imports: [MailerModule, TemplateModule, ScheduleEmailModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
