import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { UsersDao } from './user.dao';
import { CreateUserDto, FindUserDto, DeleteUserByIdDto } from './user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}
  create(user: CreateUserDto) {
    return this.usersDao.create(user);
  }

  findAll() {
    console.log(`This action returns all users`);
    const result = this.usersDao.findAll();
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

  update(id: string) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
