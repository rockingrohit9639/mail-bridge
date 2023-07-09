import { BadRequestException, Injectable } from '@nestjs/common'
import { ApiKey } from '@prisma/client'
import { PrismaService } from '~/prisma/prisma.service'
import { SanitizedUser } from '~/user/user.types'
import { MAX_API_KEYS_ALLOWED } from './api-key.constants'
import { CreateApiKeyDto } from './api-key.dto'

@Injectable()
export class ApiKeyService {
  constructor(private readonly prismaService: PrismaService) {}

  async createApiKey(dto: CreateApiKeyDto, user: SanitizedUser): Promise<ApiKey> {
    const userApiKeys = await this.prismaService.apiKey.count({ where: { createdById: user.id } })
    if (userApiKeys >= MAX_API_KEYS_ALLOWED) {
      throw new BadRequestException(
        'You have reached the maximum number of API keys allowed. To get more keys please upgrade your account.',
      )
    }

    return this.prismaService.apiKey.create({
      data: {
        name: dto.name,
        value: this.generateKey(),
        createdBy: { connect: { id: user.id } },
      },
    })
  }

  private generateKey(): string {
    // creating a base-36 string that contains 30 chars in a-z,0-9
    return [...Array(30)].map(() => ((Math.random() * 36) | 0).toString(36)).join('')
  }

  getUserApiKeys(user: SanitizedUser): Promise<ApiKey[]> {
    return this.prismaService.apiKey.findMany({ where: { createdById: user.id } })
  }
}
