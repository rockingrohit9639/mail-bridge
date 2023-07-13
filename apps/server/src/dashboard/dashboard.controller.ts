import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtGuard } from '~/auth/jwt/jwt.guard'
import { DashboardService } from './dashboard.service'
import { GetUser } from '~/auth/user.decorator'
import { SanitizedUser } from '~/user/user.types'
import { DashboardStats } from './dashboard.types'

@UseGuards(JwtGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getDashboardStats(@GetUser() user: SanitizedUser): Promise<DashboardStats> {
    return this.dashboardService.getDashboardStats(user)
  }
}
