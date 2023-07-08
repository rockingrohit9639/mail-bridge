import { ConfigModuleOptions } from '@nestjs/config'
import * as joi from 'types-joi'

const validationSchema = joi.object({
  PORT: joi.number().integer().min(1000).max(9999).required(),
  DATABASE_URL: joi.string().required(),
})

export type EnvironmentVars = joi.InterfaceFrom<typeof validationSchema>

export const configOptions: ConfigModuleOptions = {
  envFilePath: ['.env'],
  isGlobal: true,
  validationSchema,
}
