import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Delete,
  UseGuards,
  Logger,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { Roles, NoAuth } from '@/common/guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { LoginUserDto, FindUserDto, DeleteUserByIdDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @NoAuth()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() user: LoginUserDto, @Request() req) {
    return req.user;
  }

  @Get('logout')
  logout() {
    return;
  }
}
