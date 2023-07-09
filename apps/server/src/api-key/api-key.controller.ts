import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiKey } from '@prisma/client'
import { JwtGuard } from '~/auth/jwt/jwt.guard'
import { ApiKeyService } from './api-key.service'
import { GetUser } from '~/auth/user.decorator'
import { SanitizedUser } from '~/user/user.types'

@UseGuards(JwtGuard)
@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  createApiKey(@GetUser() user: SanitizedUser): Promise<ApiKey> {
    return this.apiKeyService.createApiKey(user)
  }

  @Get()
  getUserApiKeys(@GetUser() user: SanitizedUser): Promise<ApiKey[]> {
    return this.apiKeyService.getUserApiKeys(user)
  }
}
