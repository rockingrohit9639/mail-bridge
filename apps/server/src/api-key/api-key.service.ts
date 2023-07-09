import { BadRequestException, Injectable } from '@nestjs/common'
import { ApiKey } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
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
    return uuidv4()
  }

  getUserApiKeys(user: SanitizedUser): Promise<ApiKey[]> {
    return this.prismaService.apiKey.findMany({ where: { createdById: user.id } })
  }
}
