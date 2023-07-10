import { IsNotEmpty, IsObject } from 'class-validator'

export class SendMailDto {
  @IsObject()
  @IsNotEmpty()
  data: { email: string } & Record<string, string | number>
}
