import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configOptions } from './config/config.options'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { ApiKeyModule } from './api-key/api-key.module'

@Module({
  imports: [ConfigModule.forRoot(configOptions), PrismaModule, AuthModule, UserModule, ApiKeyModule],
  providers: [],
})
export class AppModule {}
