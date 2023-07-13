import { Module } from '@nestjs/common'
import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'
import { MailerModule } from '~/mailer/mailer.module'
import { TemplateModule } from '~/template/template.module'

@Module({
  imports: [MailerModule, TemplateModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
