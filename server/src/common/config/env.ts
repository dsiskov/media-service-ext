import { registerAs } from '@nestjs/config'
import { validate } from './env-validation'

export interface IAppConfig {
  session: {
    host: string
    port: number
    prefix: string
    secret: string
    maxAge: number
  }
  port: number
}

export default registerAs('app-config', (): IAppConfig => {
  validate(process.env)

  return {
    port: parseInt(process.env.PORT) || 3000,
    session: {
      host: process.env.SESSION_HOST,
      port: parseInt(process.env.SESSION_PORT),
      prefix: process.env.SESSION_PREFIX,
      secret: process.env.SESSION_SECRET,
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
    },
  }
})
