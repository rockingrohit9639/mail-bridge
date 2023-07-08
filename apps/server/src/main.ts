import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'
import { EnvironmentVars } from './config/config.options'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  /** Enabling CORS */
  app.enableCors({
    origin: '*',
    exposedHeaders: 'content-disposition',
  })

  /** Configuring PORT */
  const configService: ConfigService<EnvironmentVars> = app.get(ConfigService)
  const PORT = configService.get('PORT')
  await app.listen(PORT)

  Logger.log(`Server started listening on ${PORT}`)
}
bootstrap()
