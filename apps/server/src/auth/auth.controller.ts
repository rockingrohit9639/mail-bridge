import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, SignupDto } from './auth.dto'
import { SanitizedUser } from '~/user/user.types'
import { JwtGuard } from './jwt/jwt.guard'
import { GetUser } from './user.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto): Promise<{ user: SanitizedUser; accessToken: string }> {
    return this.authService.login(dto)
  }

  @Post('signup')
  signup(@Body() dto: SignupDto): Promise<{ user: SanitizedUser; accessToken: string }> {
    return this.authService.signup(dto)
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getUser(@GetUser() user: SanitizedUser) {
    return user
  }
}
