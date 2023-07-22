import { ScheduledEmailType } from '@prisma/client'
import { IsDateString, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator'
import { PickType } from '@nestjs/mapped-types'

export class CreateScheduleEmailDto {
  @IsString({ each: true })
  to: string[]

  @IsEnum(ScheduledEmailType)
  type: ScheduledEmailType

  @IsDateString()
  scheduledTime: string

  @IsMongoId()
  template: string

  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string
}

export class UpdateScheduleEmailDto extends PickType(CreateScheduleEmailDto, ['title', 'description']) {}
