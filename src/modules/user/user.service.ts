import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { UsersDao } from './user.dao';
import { CreateUserDto, FindUserDto, DeleteUserByIdDto } from './user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}
  async create(user) {
    console.log('==create==', user);

    return;
    const result = await this.usersDao.create(user);
    return result;
  }

  async findAll() {
    console.log('findAll');

    const result = await this.usersDao.findAll();
    return result;
  }

  async findById(id: string) {
    const result = await this.usersDao.findById(id);
    if (result) {
      return result;
    } else {
      throw new HttpException('该用户不存在', HttpStatus.BAD_REQUEST);
    }
  }

  async findByName(username: string) {
    const result = await this.usersDao.findByName(username);
    if (result && result.length === 1) {
      // mongoose返回的对象包含很多属性，使用展开运算法时会多出来其它的属性，使用toJSON可以剔除无用的属性
      return result[0].toJSON();
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

    if (deletedCount) {
      return;
    } else {
      throw new HttpException('该用户id不存在', HttpStatus.BAD_REQUEST);
    }
  }
}
