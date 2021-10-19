import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './user.dto';
import {
  UserRole,
  UserRoleDocument,
} from '@/common/Schema/user-role/index.schema';

@Injectable()
export class UsersDao {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(user: CreateUserDto) {
    return this.userModel.create(user);
  }

  async findAll() {
    /*  return this.userModel.find({}).populate(['user_role']); */
    // const result = await this.userModel.find({});
    const result = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'user_role',
          let: { userId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$userId', '$$userId'] },
              },
            },
          ],
          as: 'userRole',
        },
      },
      { $unwind: '$userRole' },
      {
        $lookup: {
          from: 'role',
          let: { roleId: { $toObjectId: '$userRole.roleId' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$roleId'] },
              },
            },
          ],
          as: 'role',
        },
      },
      { $unwind: '$role' },
      {
        $lookup: {
          from: 'role_resource',
          let: { roleId: { $toString: '$role._id' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$roleId', '$$roleId'] },
              },
            },
          ],
          as: 'roleResource',
        },
      },
      {
        $unwind: '$roleResource',
      },
    ]);
    const result1 = await this.userModel.find({});
    console.log('result===', result);
    console.log('result====userRole===', result[0]?.userRole);
    console.log('result=====role==', result[0]?.role);
    console.log('result=====roleResource==', result[0]?.roleResource);
    // console.log('result=====role==', result[1]?.role);
    // console.log('result1===', result1);

    return result1;
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

const a = {
  _id: '12346789',
  username: '管理A',
  userRole: {
    type: 0,
    name: '管理员',
  },
  resource: [
    {
      type: 'menu',
      list: [
        {
          url: '/user',
          playLoad: {
            modify: true,
            find: true,
            add: true,
            delete: true,
          },
        },
        {
          url: '/article',
          playLoad: {
            modify: true,
            find: true,
            add: true,
            delete: true,
          },
        },
      ],
    },
    {
      type: 'action',
      playLoad: {
        url: '/user',
      },
    },
  ],
};
