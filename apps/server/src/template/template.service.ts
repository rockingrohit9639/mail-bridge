import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Template } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { PrismaService } from '~/prisma/prisma.service'
import { CreateTemplateDto, UpdateTemplateDto } from './template.dto'
import { SanitizedUser } from '~/user/user.types'
import { MAX_TEMPLATES_ALLOWED } from '~/config/constants'

@Injectable()
export class TemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTemplate(dto: CreateTemplateDto, user: SanitizedUser): Promise<Template> {
    const userTemplates = await this.prismaService.template.count({ where: { createdById: user.id } })
    if (userTemplates >= MAX_TEMPLATES_ALLOWED) {
      throw new BadRequestException(
        'You have created maximum number of templates allowed. To create more templates please upgrade your account.',
      )
    }

    return this.prismaService.template.create({
      data: {
        name: dto.name,
        subject: dto.subject,
        content: dto.content,
        isDefault: userTemplates === 0 /** First created template will be used as default  */,
        templateId: uuid(),
        createdById: user.id,
      },
    })
  }

  async findOneById(id: string, userId: string): Promise<Template> {
    const template = await this.prismaService.template.findFirst({ where: { id, createdById: userId } })
    if (!template) {
      throw new NotFoundException('Template not found!')
    }
    return template
  }

  async updateTemplate(id: string, dto: UpdateTemplateDto, user: SanitizedUser): Promise<Template> {
    const template = await this.findOneById(id, user.id)

    return this.prismaService.template.update({
      where: { id: template.id },
      data: {
        name: dto.name,
        content: dto.content,
        subject: dto.subject,
      },
    })
  }

  async deleteTemplate(id: string, user: SanitizedUser): Promise<Template> {
    const template = await this.findOneById(id, user.id)

    if (template.isDefault) {
      throw new ConflictException('You cannot delete default template!')
    }

    return this.prismaService.template.delete({ where: { id } })
  }

  findAll(user: SanitizedUser): Promise<Template[]> {
    return this.prismaService.template.findMany({ where: { createdById: user.id } })
  }

  async makeDefault(id: string, user: SanitizedUser): Promise<Template> {
    const template = await this.findOneById(id, user.id)
    const defaultTemplate = await this.prismaService.template.findFirst({
      where: { isDefault: true, createdById: user.id },
    })

    const [updatedTemplate] = await this.prismaService.$transaction([
      this.prismaService.template.update({ where: { id: template.id }, data: { isDefault: true } }),
      this.prismaService.template.update({ where: { id: defaultTemplate.id }, data: { isDefault: false } }),
    ])

    return updatedTemplate
  }

  async findDefaultForUser(userId: string): Promise<Template> {
    const template = await this.prismaService.template.findFirst({ where: { isDefault: true, createdById: userId } })
    if (!template) {
      throw new NotFoundException('You have not set any template as default yet!')
    }
    return template
  }
}
