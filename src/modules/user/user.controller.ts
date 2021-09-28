import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  ValidationPipe,
  UsePipes,
  Headers,
} from '@nestjs/common';
import {
  HttpExceptionFilter,
  ForbiddenException,
} from '@/common/error-interceptor';
import { Roles, RolesGuard } from '@/common/guard';
import { UsersService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    // throw new ForbiddenException();
    // throw new Error('xxxxxxxx');
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
