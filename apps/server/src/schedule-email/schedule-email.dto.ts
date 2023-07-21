import { ScheduledEmailType } from '@prisma/client'
import { IsDateString, IsEnum, IsMongoId, IsString } from 'class-validator'

export class CreateScheduleEmailDto {
  @IsString({ each: true })
  to: string[]

  @IsEnum(ScheduledEmailType)
  type: ScheduledEmailType

  @IsDateString()
  scheduledTime: string

  @IsMongoId()
  template: string
}
