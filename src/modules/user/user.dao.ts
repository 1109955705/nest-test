import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto, FindUserDto, DeleteUserByIdDto } from './user.dto';

@Injectable()
export class UsersDao {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(user: CreateUserDto) {
    return this.userModel.create(user);
  }

  findAll() {
    return this.userModel.find({});
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  findByName(username: string) {
    return this.userModel.find({ username });
  }

  update(id: string) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
