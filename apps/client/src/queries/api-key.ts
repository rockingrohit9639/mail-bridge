import { ApiKey } from '~/types/api-key'
import { apiClient } from '~/utils/client'

export async function fetchApiKeys() {
  const { data } = await apiClient.get<ApiKey[]>('/api-key')
  return data
}

export async function createApiKey(name: string) {
  const { data } = await apiClient.post<ApiKey>('/api-key', { name })
  return data
}
