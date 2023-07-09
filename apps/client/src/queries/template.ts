import { CreateTemplateDto, Template } from '~/types/template'
import { apiClient } from '~/utils/client'

export async function fetchTemplates() {
  const { data } = await apiClient.get('templates')
  return data
}

export async function createTemplate(dto: CreateTemplateDto) {
  const { data } = await apiClient.post<Template[]>('/templates', dto)
  return data
}
