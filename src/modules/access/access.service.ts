import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AccessDao } from './access.dao';
import {
  CreateAccessDto,
  UpdateAccessDto,
  DeleteAccessDto,
  FindAccessByIdDto,
} from './access.dto';

@Injectable()
export class AccessService {
  constructor(private readonly accessDao: AccessDao) {}
  async create(user: CreateAccessDto) {
    const result = await this.accessDao.create(user);
    return result;
  }

  async findAll() {
    console.log('findAll');

    const result = await this.accessDao.findAll();
    return result;
  }

  async findById(param: FindAccessByIdDto) {
    const result = await this.accessDao.findById(param);
    if (result) {
      return result;
    } else {
      throw new HttpException('该id不存在', HttpStatus.BAD_REQUEST);
    }
  }

  async update(param: UpdateAccessDto) {
    const result = await this.accessDao.update(param);
    return result;
  }

  async remove(param: DeleteAccessDto) {
    const { deletedCount } = await this.accessDao.remove(param);

    if (deletedCount) {
      return;
    } else {
      throw new HttpException('该id不存在', HttpStatus.BAD_REQUEST);
    }
  }
}
