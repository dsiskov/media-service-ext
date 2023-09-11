import { createMock } from '@golevelup/ts-jest'
import { JsonLogger } from '../../utils/logger/json-logger'
import { LoggingInterceptor } from './logging.interceptor'
import { of } from 'rxjs'
import { ExecutionContext } from '@nestjs/common'

const mockResponseData = { data: 'arrived' }
const callHandler = {
  handle() {
    return of(mockResponseData)
  },
}

describe('LoggingInterceptor', () => {
  let logger: JsonLogger
  let interceptor: LoggingInterceptor

  beforeEach(() => {
    logger = new JsonLogger()
    interceptor = new LoggingInterceptor(logger)
  })

  it('should be defined', () => {
    expect(interceptor).toBeDefined()
  })

  it('logs requests', () => {
    jest.spyOn(logger, 'log').mockImplementation()
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => 1694436208500)
      .mockImplementationOnce(() => 1694436208510)

    const mockExecutionContext = createMock<ExecutionContext>()
    mockExecutionContext.switchToHttp().getRequest.mockImplementation(() => ({
      url: 'mock-url',
      method: 'GET',
    }))
    mockExecutionContext.switchToHttp().getResponse.mockImplementation(() => ({
      statusCode: 200,
    }))

    interceptor
      .intercept(mockExecutionContext, callHandler)
      .subscribe((data) => {
        expect(data).toEqual(mockResponseData)
      })

    expect(logger.log).toHaveBeenCalledWith('200 (10ms): GET mock-url')
  })
})
