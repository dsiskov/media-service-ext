import { createClient } from 'redis'
import * as connectRedis from 'connect-redis'
import * as session from 'express-session'
import { IAppConfig } from '../../config/env'
import { JsonLogger } from '../logger/json-logger'

export default function redisSession(
  appConfig: IAppConfig,
  logger: JsonLogger,
) {
  if (appConfig.session.disable) return

  const RedisStore = connectRedis(session)

  const redisClient = createClient({
    host: appConfig.session.host,
    port: appConfig.session.port,
  })
  const redisStore = new RedisStore({
    client: redisClient,
  })

  redisClient.on('error', (err) =>
    logger.error('Could not establish a connection with redis. ' + err),
  )
  redisClient.on('connect', () => logger.log('Connected to redis successfully'))

  return session({
    store: redisStore,
    secret: appConfig.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: appConfig.session.maxAge, // session max age in milliseconds
    },
  })
}
