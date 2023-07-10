import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ApiKeyService } from './api-key.service'

/** This will check the X-API-KEY in headers, if not found request will be unauthorized  */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(@Inject(ApiKeyService) private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const apiKeyHeader = request.headers['x-api-key']
    if (!apiKeyHeader) {
      throw new UnauthorizedException('API Key not found')
    }

    const apiKey = await this.apiKeyService.findOneByValue(apiKeyHeader)
    const isUsageAllowed = await this.apiKeyService.isUsageRemaining(apiKey.id)
    if (!isUsageAllowed) {
      throw new UnauthorizedException('API Key usage limit reached!')
    }

    const user = await this.apiKeyService.findUserById(apiKey.createdById)
    if (!user) {
      throw new UnauthorizedException('Invalid API Key!')
    }

    request.apiKey = apiKey
    request.user = user

    return true
  }
}
