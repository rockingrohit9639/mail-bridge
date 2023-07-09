import { User } from './user'

export type ApiKey = {
  id: string
  name: string
  value: string
  usage: number
  createdBy: User
  createdById: number
  createdAt: string
  updatedAt: string
}
