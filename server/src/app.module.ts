import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import env from './common/config/env'
import type { RedisClientOptions } from 'redis'
import { HealthModule } from './health/health.module'
import * as redisStore from 'cache-manager-redis-store'
import { LoggerModule } from './common/utils/logger/json-logger.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [env] }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      host: process.env.SESSION_HOST,
      port: process.env.SESSION_PORT,
    }),
    LoggerModule,
    HealthModule,
  ],
})
export class AppModule {}
