import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ApiKey } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { PrismaService } from '~/prisma/prisma.service'
import { SanitizedUser } from '~/user/user.types'
import { CreateApiKeyDto } from './api-key.dto'
import { MAX_API_KEYS_ALLOWED, MAX_API_USAGE_ALLOWED } from '~/config/constants'
import { UserService } from '~/user/user.service'

@Injectable()
export class ApiKeyService {
  constructor(private readonly prismaService: PrismaService, private readonly userService: UserService) {}

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

  async findOneByValue(value: string): Promise<ApiKey> {
    const apiKey = await this.prismaService.apiKey.findFirst({ where: { value } })
    if (!apiKey) {
      throw new NotFoundException('API Key not found')
    }
    return apiKey
  }

  async findUserById(id: string): Promise<SanitizedUser> {
    return this.userService.findOneById(id)
  }

  async findOneById(id: string): Promise<ApiKey> {
    const apiKey = await this.prismaService.apiKey.findFirst({ where: { id } })
    if (!apiKey) {
      throw new NotFoundException('API Key not found')
    }
    return apiKey
  }

  async increaseUsageCount(id: string): Promise<ApiKey> {
    const apiKey = await this.findOneById(id)
    return this.prismaService.apiKey.update({
      where: { id: apiKey.id },
      data: {
        usage: { increment: 1 },
      },
    })
  }

  async isUsageRemaining(id: string): Promise<boolean> {
    const apiKey = await this.findOneById(id)
    return apiKey.usage < MAX_API_USAGE_ALLOWED
  }

  getTotalApisCreated(user: SanitizedUser): Promise<number> {
    return this.prismaService.apiKey.count({ where: { createdById: user.id } })
  }

  async getApiUsage(user: SanitizedUser): Promise<{ total: number; remaining: number }> {
    const totalApis = await this.getTotalApisCreated(user)
    const {
      _sum: { usage },
    } = await this.prismaService.apiKey.aggregate({
      where: { createdById: user.id },
      _sum: { usage: true },
    })

    const totalUsageAllowed = totalApis * MAX_API_USAGE_ALLOWED
    return {
      total: totalUsageAllowed,
      remaining: totalUsageAllowed - usage,
    }
  }
}
