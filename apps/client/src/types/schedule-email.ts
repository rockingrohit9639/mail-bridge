import { Template } from './template'
import { User } from './user'

export enum ScheduledEmailType {
  FIXED_TIME = 'FIXED_TIME',
}

export type ScheduledEmail = {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  to: string[]
  type: ScheduledEmailType
  scheduledTime: string
  template: Template
  templateId: string
  createdBy: User
  createdById: string
}

export type CreateScheduleEmailDto = Pick<ScheduledEmail, 'to' | 'type' | 'scheduledTime' | 'title' | 'description'> & {
  template: string
}

export type UpdateScheduleEmailDto = Pick<ScheduledEmail, 'title' | 'description'>
