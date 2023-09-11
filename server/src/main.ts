import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { createClient } from 'redis'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
import { IAppConfig } from './common/config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)
  const appConfig = configService.get<IAppConfig>('app-config')

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

  app.use(
    session({
      store: redisStore,
      secret: appConfig.session.secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: appConfig.session.maxAge, // session max age in milliseconds
      },
    }),
  )

  await app.listen(appConfig.port)
}
bootstrap()
