import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { IAppConfig } from './common/config/env'
import redisSession from './common/utils/session/redis-store'
import { JsonLogger } from './common/utils/logger/json-logger'

async function bootstrap() {
  const logger = new JsonLogger()
  const app = await NestFactory.create(AppModule, {
    logger,
  })
  app.setGlobalPrefix('api')

  const configService = app.get<ConfigService>(ConfigService)
  const appConfig = configService.get<IAppConfig>('app-config')

  app.use(redisSession(appConfig, logger))

  await app.listen(appConfig.port)
}
bootstrap()
