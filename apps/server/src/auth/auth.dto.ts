import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class SignupDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string
}

export class LoginDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
