import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { Roles, RoleAuthGuard } from '@/common/guard';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './user.service';
import { CreateUserDto, FindUserDto, DeleteUserByIdDto } from './user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findOne(@Body() param: FindUserDto) {
    const { id } = param;
    if (id) {
      return this.usersService.findById(id);
    } else {
      return this.usersService.findAll();
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  @Roles('admin')
  @Delete()
  remove(@Body() param: DeleteUserByIdDto) {
    const { id } = param;
    return this.usersService.remove(id);
  }
}
