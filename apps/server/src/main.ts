import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { EnvironmentVars } from './config/config.options'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  /** Enabling CORS */
  app.enableCors({
    origin: '*',
    exposedHeaders: 'content-disposition',
  })

  /** Enabling validation pipes to validate dtos */
  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))

  /** Graceful application shutdown */
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  /** Configuring PORT */
  const configService: ConfigService<EnvironmentVars> = app.get(ConfigService)
  const PORT = configService.get('PORT')
  await app.listen(PORT)

  Logger.log(`Server started listening on ${PORT}`)
}
bootstrap()
