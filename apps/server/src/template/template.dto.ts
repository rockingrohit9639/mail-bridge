import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateTemplateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  subject: string

  @IsString()
  @MinLength(4)
  @MaxLength(100)
  name: string

  @IsString()
  @MinLength(20)
  content: string
}

export class UpdateTemplateDto extends CreateTemplateDto {
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean
}
