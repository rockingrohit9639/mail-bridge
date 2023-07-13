import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'
import { MailerController } from './mailer.controller'
import { MailerService } from './mailer.service'
import { EnvironmentVars } from '~/config/config.options'
import { TemplateModule } from '~/template/template.module'

@Module({
  imports: [TemplateModule],
  controllers: [MailerController],
  providers: [
    MailerService,
    {
      provide: 'MAIL_TRANSPORTER',
      useFactory: (configService: ConfigService<EnvironmentVars>) => {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: configService.get('EMAIL'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        })
        return transporter
      },
      inject: [ConfigService],
    },
  ],
  exports: [MailerService],
})
export class MailerModule {}
