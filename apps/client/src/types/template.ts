import { User } from './user'

export type Template = {
  id: string
  name: string
  subject: string
  content: string
  templateId: string
  isDefault: boolean
  createdBy: User
  createdById: string
  createdAt: string
  updatedAt: string
}

export type CreateTemplateDto = Pick<Template, 'name' | 'subject' | 'content'>
export type UpdateTemplateDto = Partial<CreateTemplateDto> & { isDefault: boolean }
