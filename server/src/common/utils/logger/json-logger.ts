import { Injectable, Scope, ConsoleLogger, LogLevel } from '@nestjs/common'

@Injectable({ scope: Scope.TRANSIENT })
export class JsonLogger extends ConsoleLogger {
  protected formatPid(pid: number) {
    return `${pid}`
  }

  protected formatContext(context: string) {
    return context
  }

  protected formatMessage(
    logLevel: LogLevel,
    message: string | Record<string, any>,
    pid: string,
    _formattedLogLevel: string,
    context: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    timestampDiff: string,
  ): string {
    const logMessage = {
      pid,
      timestamp: this.getTimestamp(),
      type: 'spotify-controls-backend',
      context,
      level: logLevel,
      message,
    }

    return `${JSON.stringify(logMessage)}\n`
  }
}
