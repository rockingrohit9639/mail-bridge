import { SignupDto } from '~/types/auth'
import { User } from '~/types/user'
import { apiClient } from '~/utils/client'

export async function signup(dto: SignupDto) {
  const { data } = await apiClient.post<{ user: User; accessToken: string }>('/auth/signup', dto)
  return data
}
