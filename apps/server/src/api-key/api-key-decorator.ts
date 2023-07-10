import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const GetApiKey = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.apiKey
})
