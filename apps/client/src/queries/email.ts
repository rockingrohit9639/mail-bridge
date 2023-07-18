import { Email } from '~/types/email'
import { apiClient } from '~/utils/client'

export async function getEmails() {
  const { data } = await apiClient.get<Email[]>('/emails')
  return data
}
