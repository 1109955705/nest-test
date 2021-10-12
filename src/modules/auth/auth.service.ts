import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username, password): Promise<any> {
    const user = await this.usersService.findByName(username);
    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }
    throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
  }

  async login(username, password) {
    console.log('登录校验');
    const result = await this.validateUser(username, password);
    const payload = { userId: result._id };
    return {
      ...result,
      token: this.jwtService.sign(payload),
    };
  }
}
