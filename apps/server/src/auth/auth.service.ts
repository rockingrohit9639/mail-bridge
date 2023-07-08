import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { omit } from 'lodash'
import { LoginDto, SignupDto } from './auth.dto'
import { UserService } from '~/user/user.service'
import { JwtPayload } from './auth.types'
import { SanitizedUser } from '~/user/user.types'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async login(dto: LoginDto): Promise<{ user: SanitizedUser; accessToken: string }> {
    const user = await this.userService.findOneByEmail(dto.email)
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials!')
    }

    const isPasswordValid = await bcrypt.compareSync(dto.password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials')
    }

    const payload = { id: user.id, email: user.email } satisfies JwtPayload
    return {
      user: omit(user, 'password'),
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async signup(dto: SignupDto): Promise<{ user: SanitizedUser; accessToken: string }> {
    const existingUser = await this.userService.findOneByEmail(dto.email)
    if (existingUser) {
      throw new BadRequestException('User already exists!')
    }

    const hashedPassword = await bcrypt.hashSync(dto.password, 10)
    const user = await this.userService.createUser({ ...dto, password: hashedPassword })
    const payload = { id: user.id, email: user.email } satisfies JwtPayload
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async validatePayload(payload: JwtPayload): Promise<SanitizedUser> {
    const user = await this.userService.findOneById(payload.id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return omit(user, 'password')
  }
}
