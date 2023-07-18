import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiKey, Email } from '@prisma/client'
import { MailerService } from './mailer.service'
import { SendMailDto } from './mailer.dto'
import { ApiKeyGuard } from '~/api-key/api-key.guard'
import { GetUser } from '~/auth/user.decorator'
import { SanitizedUser } from '~/user/user.types'
import { GetApiKey } from '~/api-key/api-key-decorator'
import { JwtGuard } from '~/auth/jwt/jwt.guard'

@Controller('emails')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  @UseGuards(ApiKeyGuard)
  sendMail(@Body() dto: SendMailDto, @GetUser() user: SanitizedUser, @GetApiKey() apiKey: ApiKey) {
    return this.mailerService.sendMail(dto, user, apiKey)
  }

  @Post('send/:templateId')
  sendByTemplateId(
    @Body() dto: SendMailDto,
    @GetUser() user: SanitizedUser,
    @GetApiKey() apiKey: ApiKey,
    @Param('templateId') templateId: string,
  ) {
    return this.mailerService.sendMail(dto, user, apiKey, templateId)
  }

  @UseGuards(JwtGuard)
  @Get()
  getMails(@GetUser() user: SanitizedUser): Promise<Email[]> {
    return this.mailerService.getMails(user)
  }
}
