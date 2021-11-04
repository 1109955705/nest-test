import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Logger,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Roles, RoleAuthGuard, NoAuth } from '@/common/guard';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UsersService } from './user.service';
import { CreateUserDto, FindUserDto, DeleteUserByIdDto } from './user.dto';
import { plainToClass } from 'class-transformer';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    console.log('xxxxxxxxxxx');
    this.logger.error('xxxxxxxxxxxxx');
    // const o = plainToClass(CreateUserDto, user, {
    //   enableCircularCheck: false,
    //   enableImplicitConversion: false,
    //   excludeExtraneousValues: false,
    //   excludePrefixes: undefined,
    //   exposeDefaultValues: false,
    //   exposeUnsetFields: true,
    //   groups: undefined,
    //   ignoreDecorators: false,
    //   strategy: undefined,
    //   targetMaps: undefined,
    //   version: undefined
    // });
    // const o = plainToClass(CreateUserDto, user, {});
    // const o = plainToClass(CreateUserDto, user, {
    //   targetMaps: {
    //     target: CreateUserDto,
    //     properties: {
    //       password: String,
    //     },
    //   },
    // });
    // console.log('AAAA', o);
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
