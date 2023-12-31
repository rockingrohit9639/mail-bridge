import { Injectable } from '@nestjs/common'
import { SanitizedUser } from '~/user/user.types'
import { DashboardStats } from './dashboard.types'
import { ApiKeyService } from '~/api-key/api-key.service'
import { MailerService } from '~/mailer/mailer.service'
import { TemplateService } from '~/template/template.service'
import { ScheduleEmailService } from '~/schedule-email/schedule-email.service'

@Injectable()
export class DashboardService {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly mailService: MailerService,
    private readonly templateService: TemplateService,
    private readonly scheduleEmailService: ScheduleEmailService,
  ) {}

  async getDashboardStats(user: SanitizedUser): Promise<DashboardStats> {
    const totalApisCreated = await this.apiKeyService.getTotalApisCreated(user)
    const apiUsage = await this.apiKeyService.getApiUsage(user)
    const totalEmailSent = await this.mailService.getTotalEmailSent(user)
    const totalTemplatesCreated = await this.templateService.getTotalTemplatesCreated(user)
    const totalEmailScheduled = await this.scheduleEmailService.getTotalScheduledEmails(user)

    return {
      totalApisCreated,
      apiUsage,
      totalEmailSent,
      totalTemplatesCreated,
      totalEmailScheduled,
    }
  }
}
