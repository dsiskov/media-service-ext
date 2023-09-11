import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { JsonLogger } from '../../utils/logger/json-logger'
import { Response as ResponseExpress } from 'express'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: JsonLogger) {
    this.logger.setContext(LoggingInterceptor.name)
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest<Request>()
        const response = context.switchToHttp().getResponse<ResponseExpress>()

        this.logger.log(
          `${response.statusCode} (${Date.now() - now}ms): ${request.method} ${
            request.url
          }`,
        )
      }),
    )
  }
}
