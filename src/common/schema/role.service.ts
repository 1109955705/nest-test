import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './role.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(createCatDto: any): Promise<Role> {
    const createdCat = new this.roleModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }
}
