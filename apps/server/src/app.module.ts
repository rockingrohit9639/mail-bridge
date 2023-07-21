import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { configOptions } from './config/config.options'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { ApiKeyModule } from './api-key/api-key.module'
import { TemplateModule } from './template/template.module'
import { MailerModule } from './mailer/mailer.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { ScheduleEmailModule } from './schedule-email/schedule-email.module'

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    ApiKeyModule,
    TemplateModule,
    MailerModule,
    DashboardModule,
    ScheduleEmailModule,
  ],
  providers: [],
})
export class AppModule {}
