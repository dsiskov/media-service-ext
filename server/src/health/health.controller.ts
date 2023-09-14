import { Controller, Get } from '@nestjs/common'
import { IHealth } from 'lib/interfaces'

@Controller('health')
export class HealthController {
  @Get('ready')
  ready(): IHealth {
    return { status: 'ready' }
  }

  @Get('alive')
  alive(): IHealth {
    return { status: 'alive' }
  }
}
