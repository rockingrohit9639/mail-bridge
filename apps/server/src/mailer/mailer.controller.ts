import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiKey } from '@prisma/client'
import { MailerService } from './mailer.service'
import { SendMailDto } from './mailer.dto'
import { ApiKeyGuard } from '~/api-key/api-key.guard'
import { GetUser } from '~/auth/user.decorator'
import { SanitizedUser } from '~/user/user.types'
import { GetApiKey } from '~/api-key/api-key-decorator'

@Controller('emails')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  @UseGuards(ApiKeyGuard)
  sendMail(@Body() dto: SendMailDto, @GetUser() user: SanitizedUser, @GetApiKey() apiKey: ApiKey) {
    return this.mailerService.sendMail(dto, user, apiKey)
  }
}
