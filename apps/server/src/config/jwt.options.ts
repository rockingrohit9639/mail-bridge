import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'
import { EnvironmentVars } from './config.options'

export async function createJwtOptions(configService: ConfigService<EnvironmentVars>): Promise<JwtModuleOptions> {
  return {
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRATION'),
    },
  }
}
