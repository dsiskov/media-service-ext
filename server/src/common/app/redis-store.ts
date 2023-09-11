import { createClient } from 'redis'
import * as connectRedis from 'connect-redis'
import * as session from 'express-session'
import { IAppConfig } from '../config/env'

export default function redisSession(appConfig: IAppConfig) {
  const RedisStore = connectRedis(session)

  const redisClient = createClient({
    host: appConfig.session.host,
    port: appConfig.session.port,
  })
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: appConfig.session.prefix,
  })

  redisClient.on('error', (err) =>
    console.log('Could not establish a connection with redis. ' + err),
  )
  redisClient.on('connect', () =>
    console.log('Connected to redis successfully'),
  )

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
