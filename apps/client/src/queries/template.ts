import { CreateTemplateDto, Template, UpdateTemplateDto } from '~/types/template'
import { apiClient } from '~/utils/client'

export async function fetchTemplates() {
  const { data } = await apiClient.get('templates')
  return data
}

export async function createTemplate(dto: CreateTemplateDto) {
  const { data } = await apiClient.post<Template[]>('/templates', dto)
  return data
}

export async function fetchTemplate(id: string) {
  const { data } = await apiClient.get<Template>(`/templates/${id}`)
  return data
}

export async function updateTemplate(id: string, dto: UpdateTemplateDto) {
  const { data } = await apiClient.patch<Template>(`/templates/${id}`, dto)
  return data
}
