import { User } from './user'

export type Email = {
  id: string
  from: string
  to: string
  data: Record<string, any>
  content: string
  createdBy: User
  createdById: string
  createdAt: string
  updatedAt: string
}
