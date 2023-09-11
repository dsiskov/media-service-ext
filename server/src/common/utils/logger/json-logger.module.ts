import { Module } from '@nestjs/common'
import { JsonLogger } from './json-logger'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from 'src/common/interceptors/logging/logging.interceptor'

@Module({
  providers: [
    JsonLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [JsonLogger],
})
export class LoggerModule {}
