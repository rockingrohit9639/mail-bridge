import { IsEmail, IsString } from 'class-validator'

export class SignupDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}

export class LoginDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
