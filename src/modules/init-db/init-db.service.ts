import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AccessService } from '../access/access.service';
import { initAdminUser } from './init-db.data';

@Injectable()
export class InitDbService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly accessService: AccessService,
  ) {}

  onModuleInit() {
    console.log('初始化数据库');
    this.initUser();
    this.initAccess();
  }

  private async initUser(): Promise<void> {
    const userList = await this.usersService.findAll();
    if (!userList.length) {
      console.log('用户表为空，创建管理员账号');
      const createResult = await this.usersService.create(initAdminUser);
      console.log('createResult', createResult);
    }
  }

  private async initAccess(): Promise<void> {
    const accessList = await this.accessService.findAll();
    console.log('accessList:result', accessList);
    if (!accessList.length) {
      console.log('用户表为空，创建管理员账号');
      // const createResult = await this.usersService.create(initAdminUser);
      // console.log('createResult', createResult);
    }
  }
}
