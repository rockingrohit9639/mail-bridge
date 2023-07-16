import { SignupDto, LoginDto } from '~/types/auth'
import { User } from '~/types/user'
import { apiClient } from '~/utils/client'

export async function signup(dto: SignupDto) {
  const { data } = await apiClient.post<{ user: User; accessToken: string }>('/auth/signup', dto)
  return data
}

export async function login(dto: LoginDto) {
  const { data } = await apiClient.post<{ user: User; accessToken: string }>('/auth/login', dto)
  return data
}

export async function fetchLoggedInUser() {
  const { data } = await apiClient.get<User>('/auth/me')
  return data
}

export async function linkWithGoogle(dto: { access_token: string }) {
  const { data } = await apiClient.post<User>('/auth/link-with-google', dto)
  return data
}
