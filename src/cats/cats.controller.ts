import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): any {
    return {
      a: 1,
    };
  }

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
