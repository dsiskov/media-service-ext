import { Controller, Get, Res } from '@nestjs/common'

@Controller('/')
export class AppController {
  @Get()
  sendApplication(@Res() res) {
    res.sendFile('index.html')
  }
}
