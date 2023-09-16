import { registerAs } from '@nestjs/config'
import { validate } from './env-validation'

export interface IAppConfig {
  session: {
    host: string
    port: number
    disable: boolean
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
      disable: !!process.env.SESSION_DISABLE,
      secret: process.env.SESSION_SECRET,
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
    },
  }
})
