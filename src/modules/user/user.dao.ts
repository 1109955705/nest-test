import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto, FindUserDto, DeleteUserByIdDto } from './user.dto';

@Injectable()
export class UsersDao {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(user: CreateUserDto) {
    const result = this.userModel.create(user);
    return result;
  }

  async findAll() {
    const result = await this.userModel.find({});
    return result;
  }

  findById(id: string) {
    /*     const result = await this.userModel.findById(id);
    return result; */
    return this.userModel.findById(id);
  }

  async update(id: number) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const result = await this.userModel.findById(id);
    console.log('xxxxxxxx', result);

    return `This action removes a #${id} user`;
  }
}
