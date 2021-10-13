import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Access, AccessDocument } from './access.schema';
import {
  CreateAccessDto,
  UpdateAccessDto,
  DeleteAccessDto,
  FindAccessByIdDto,
} from './access.dto';

@Injectable()
export class AccessDao {
  constructor(
    @InjectModel(Access.name) private accessModel: Model<AccessDocument>,
  ) {}
  create(param: CreateAccessDto) {
    return this.accessModel.create(param);
  }

  findAll() {
    return this.accessModel.find({});
  }

  findById(param: FindAccessByIdDto) {
    const { id } = param;
    return this.accessModel.findById(id);
  }

  update(param: UpdateAccessDto) {
    const { id, ...updateAccessData } = param;
    return this.accessModel.find({});
  }

  remove(param: DeleteAccessDto) {
    const { id } = param;
    return this.accessModel.deleteOne({ _id: id });
  }
}
