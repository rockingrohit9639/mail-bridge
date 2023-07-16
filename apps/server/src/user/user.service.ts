import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { SignupDto } from '~/auth/auth.dto'
import { PrismaService } from '~/prisma/prisma.service'
import { USER_SELECT_FIELDS } from './user.fields'
import { SanitizedUser } from './user.types'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(dto: SignupDto): Promise<SanitizedUser> {
    return this.prismaService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
      },
      select: USER_SELECT_FIELDS,
    })
  }

  findOneById(id: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { id } })
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { email } })
  }

  async findOneByGoogleId(googleId: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { googleId } })
  }

  addGoogleSubInUser(userId: string, googleId: string, profilePicture: string): Promise<SanitizedUser> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { googleId, profilePicture, isGoogleVerified: true },
      select: USER_SELECT_FIELDS,
    })
  }
}
