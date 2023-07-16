import { Prisma } from '@prisma/client'

export const USER_SELECT_FIELDS = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  googleId: true,
  isGoogleVerified: true,
  profilePicture: true,
} satisfies Prisma.UserSelect
