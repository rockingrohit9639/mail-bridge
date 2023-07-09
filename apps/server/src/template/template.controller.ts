import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { Template } from '@prisma/client'
import { TemplateService } from './template.service'
import { JwtGuard } from '~/auth/jwt/jwt.guard'
import { CreateTemplateDto, UpdateTemplateDto } from './template.dto'
import { GetUser } from '~/auth/user.decorator'
import { SanitizedUser } from '~/user/user.types'

@UseGuards(JwtGuard)
@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  createTemplate(@Body() dto: CreateTemplateDto, @GetUser() user: SanitizedUser): Promise<Template> {
    return this.templateService.createTemplate(dto, user)
  }

  @Patch(':id')
  updateTemplate(
    @Param('id') id: string,
    @Body() dto: UpdateTemplateDto,
    @GetUser() user: SanitizedUser,
  ): Promise<Template> {
    return this.templateService.updateTemplate(id, dto, user)
  }

  @Get(':id')
  getTemplate(@Param('id') id: string, @GetUser() { id: userId }: SanitizedUser): Promise<Template> {
    return this.templateService.findOneById(id, userId)
  }

  @Delete(':id')
  deleteTemplate(@Param('id') id: string, @GetUser() user: SanitizedUser): Promise<Template> {
    return this.templateService.deleteTemplate(id, user)
  }

  @Get()
  findAll(@GetUser() user: SanitizedUser): Promise<Template[]> {
    return this.templateService.findAll(user)
  }

  @Patch(':id/make-default')
  makeDefault(@Param('id') id: string, @GetUser() user: SanitizedUser): Promise<Template> {
    return this.templateService.makeDefault(id, user)
  }
}
