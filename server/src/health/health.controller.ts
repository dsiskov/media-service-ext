import { Controller, Get } from '@nestjs/common'

@Controller('health')
export class HealthController {
  @Get('ready')
  ready(): string {
    return 'ready'
  }

  @Get('alive')
  alive(): string {
    return 'alive'
  }
}
