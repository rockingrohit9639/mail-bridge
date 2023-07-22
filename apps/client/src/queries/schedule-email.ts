import { CreateScheduleEmailDto, ScheduledEmail } from '~/types/schedule-email'
import { apiClient } from '~/utils/client'

export async function createScheduleMail(dto: CreateScheduleEmailDto) {
  const { data } = await apiClient.post<ScheduledEmail>('schedule-email', dto)
  return data
}

export async function getScheduledMails() {
  const { data } = await apiClient.get<ScheduledEmail[]>('schedule-email')
  return data
}
