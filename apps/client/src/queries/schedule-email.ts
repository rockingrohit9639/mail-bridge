import { CreateScheduleEmailDto, ScheduledEmail, UpdateScheduleEmailDto } from '~/types/schedule-email'
import { apiClient } from '~/utils/client'

export async function createScheduleMail(dto: CreateScheduleEmailDto) {
  const { data } = await apiClient.post<ScheduledEmail>('schedule-email', dto)
  return data
}

export async function getScheduledMails() {
  const { data } = await apiClient.get<ScheduledEmail[]>('schedule-email')
  return data
}

export async function updateScheduleEmail(id: string, dto: UpdateScheduleEmailDto) {
  const { data } = await apiClient.patch<ScheduledEmail>(`schedule-email/${id}`, dto)
  return data
}
