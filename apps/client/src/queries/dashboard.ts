import { DashboardStats } from '~/types/dashboard'
import { apiClient } from '~/utils/client'

export async function getDashboardStats() {
  const { data } = await apiClient.get<DashboardStats>('/dashboard/stats')
  return data
}
