import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { ApiKey } from '@prisma/client'
import Handlebars from 'handlebars'
import { SendMailDto } from './mailer.dto'
import { SanitizedUser } from '~/user/user.types'
import { TemplateService } from '~/template/template.service'
import { generateRegisteredUserMailContent, mailBridgeSignature } from './mailer.utils'
import { ApiKeyService } from '~/api-key/api-key.service'

@Injectable()
export class MailerService {
  constructor(
    @Inject('MAIL_TRANSPORTER') private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
    private readonly templateService: TemplateService,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async sendMail(dto: SendMailDto, user: SanitizedUser, apiKey: ApiKey) {
    const to = dto.data.email
    if (!to) {
      throw new BadRequestException('Email not provided in data.')
    }

    const defaultUserTemplate = await this.templateService.findDefaultForUser(user.id)
    const compiled = Handlebars.compile(defaultUserTemplate.content)
    const html = compiled(dto.data)
    const htmlWithSignature = this._addMailBridgeSignature(html)

    /** Sending mail to the user 1 */
    this.transporter.sendMail(
      {
        from: user.email,
        to,
        subject: defaultUserTemplate.subject,
        html: htmlWithSignature,
      },
      async (error) => {
        if (error) {
          throw new InternalServerErrorException(error)
        }
        await this.apiKeyService.increaseUsageCount(apiKey.id)
      },
    )

    /** Sending confirmation mail to our registered user */
    const registeredUserContent = generateRegisteredUserMailContent(user, apiKey.name, dto.data)
    const contentWithSignature = this._addMailBridgeSignature(registeredUserContent)
    this.transporter.sendMail(
      {
        from: user.email,
        to: user.email,
        subject: `You have received an email on ${apiKey.name}`,
        html: contentWithSignature,
      },
      (error) => {
        throw new InternalServerErrorException(error)
      },
    )

    return { status: 'SUCCESS' }
  }

  private _addMailBridgeSignature(html: string): string {
    return html + mailBridgeSignature
  }
}
