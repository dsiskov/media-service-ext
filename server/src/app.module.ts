import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import env from './common/config/env'
import type { RedisClientOptions } from 'redis'
import { HealthModule } from './health/health.module'
import * as redisStore from 'cache-manager-redis-store'
import { LoggerModule } from './common/utils/logger/json-logger.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [env] }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      host: process.env.SESSION_HOST,
      port: process.env.SESSION_PORT,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'client/dist/client'),
    }),
    LoggerModule,
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
