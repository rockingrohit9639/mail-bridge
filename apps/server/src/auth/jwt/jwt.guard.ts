import { UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw error || new UnauthorizedException('Unauthorized access')
    }

    return user
  }
}
