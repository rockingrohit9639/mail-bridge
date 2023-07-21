import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { omit } from 'lodash'
import { OAuth2Client, UserRefreshClient } from 'google-auth-library'
import { ConfigService } from '@nestjs/config'
import { LinkWithGoogleDto, LoginDto, SignupDto } from './auth.dto'
import { UserService } from '~/user/user.service'
import { JwtPayload } from './auth.types'
import { SanitizedUser } from '~/user/user.types'

@Injectable()
export class AuthService {
  private readonly client: OAuth2Client

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.client = new OAuth2Client(configService.get('GOOGLE_CLIENT_ID'), configService.get('GOOGLE_CLIENT_SECRET'))
  }

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

  async linkWithGoogle(dto: LinkWithGoogleDto, user: SanitizedUser): Promise<SanitizedUser> {
    try {
      /** Verifying if the access_token sent by user is valid */
      const refreshClient = new UserRefreshClient(
        this.configService.get('GOOGLE_CLIENT_ID'),
        this.configService.get('GOOGLE_CLIENT_SECRET'),
        dto.access_token,
      )

      /** Getting the credentials if it is valid */
      const { credentials } = await refreshClient.refreshAccessToken()
      if (!credentials.id_token) {
        throw new BadRequestException('Invalid Google Token')
      }

      /** Getting ticket from the token */
      const ticket = await this.client.verifyIdToken({
        idToken: credentials.id_token,
        audience: this.configService.get('GOOGLE_CLIENT_ID'),
      })
      const payload = ticket.getPayload()

      if (!payload) {
        throw new BadRequestException('Invalid Google Token')
      }

      if (!payload?.sub) {
        throw new BadRequestException('Invalid Google Token')
      }

      if (payload.email !== user.email) {
        throw new BadRequestException('Google email and your account email does not match!')
      }

      const existingUser = await this.userService.findOneByGoogleId(payload.sub)
      if (existingUser) {
        throw new ConflictException('This google account is already linked with another account!')
      }

      /** If everything goes well, we will add sub in our user which will make sure if account is linked with google or not */
      return this.userService.addGoogleSubInUser(user.id, payload.sub, payload.picture)
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Invalid Google Token')
    }
  }
}
