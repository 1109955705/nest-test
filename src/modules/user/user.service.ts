import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { UsersDao } from './user.dao';
import { CreateUserDto, FindUserDto, DeleteUserByIdDto } from './user.dto';
import { timeoutPromise } from '@/common/utils';
@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}
  async create(user: CreateUserDto) {
    const result = await this.usersDao.create(user);
    return result;
  }

  async findAll() {
    await this.usersDao.findAll();
  }

  async findById(id: string) {
    const result = await this.usersDao.findById(id);
    if (result) {
      return result;
    } else {
      throw new HttpException('该用户不存在', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string) {
    const result = await this.usersDao.update(id);
    return result;
  }

  async remove(id: string) {
    const { deletedCount } = await this.usersDao.remove(id);
    console.log('xxxxx', deletedCount);

    if (deletedCount) {
      return;
    } else {
      throw new HttpException('该用户id不存在', HttpStatus.BAD_REQUEST);
    }
  }
}
