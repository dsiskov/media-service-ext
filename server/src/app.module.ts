import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import env from './common/config/env'
import { HealthModule } from './health/health.module'
import type { RedisClientOptions } from 'redis'
import { CacheModule } from '@nestjs/cache-manager'
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
      rootPath: join(
        __dirname,
        process.env.NODE_ENV == 'production'
          ? '../../dist/ng-build/client'
          : '../../../client/dist/client',
      ),
    }),
    LoggerModule,
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
