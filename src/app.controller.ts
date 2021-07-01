import { Controller, Param, Query, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() query: any): string {
    console.log('xxxxxxxxxx', query);
    return this.appService.getHello(query);
  }
}
