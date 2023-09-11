import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { IAppConfig } from './common/config/env'
import redisSession from './common/app/redis-store'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)
  const appConfig = configService.get<IAppConfig>('app-config')

  app.use(redisSession(appConfig))

  await app.listen(appConfig.port)
}
bootstrap()
