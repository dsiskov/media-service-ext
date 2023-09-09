import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { createClient } from 'redis'
import * as session from 'express-session'
import RedisStore from 'connect-redis'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const redisClient = createClient({
    host: configService.get('session.host'),
    port: configService.get('session.port'),
  })
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: configService.get('session.prefix'),
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
      secret: configService.get('session.secret'),
    }),
  )

  await app.listen(configService.get('port'))
}
bootstrap()
