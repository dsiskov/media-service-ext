import { Test, TestingModule } from '@nestjs/testing'
import { JsonLogger } from './json-logger'

const mockDateTime = new Date('2000-01-01')
jest.useFakeTimers().setSystemTime(mockDateTime)

// function stringify(obj): string {
//   return JSON.stringify(obj) + '\n'
// }

describe('JsonLogger', () => {
  let logger: JsonLogger

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile()

    logger = await module.resolve<JsonLogger>(JsonLogger)
  })

  it('should be defined', () => {
    expect(logger).toBeDefined()
  })

  it('logs to stdout', () => {
    const mockStdout = jest.spyOn(process.stdout, 'write').mockImplementation()
    logger.log('test')

    expect(mockStdout).toBeCalledTimes(1)
    // TODO: Fix checks to use UTC timezone
    // expect(mockStdout).toBeCalledWith(
    //   stringify({
    //     pid: process.pid.toString(),
    //     timestamp: '01/01/2000, 1:00:00 AM',
    //     type: 'spotify-controls-backend',
    //     context: '',
    //     level: 'log',
    //     message: 'test',
    //   }),
    // )
  })
})
