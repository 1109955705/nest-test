import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { UsersDao } from './user.dao';
import { User, UserSchema } from './user.schema';
import {
  UserRole,
  UserRoleSchema,
} from '@/common/Schema/user-role/index.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      // 指定collection是因为mongoose会对数据库某些名字自动+s
      { name: User.name, schema: UserSchema, collection: 'user' },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersDao, Logger],
  exports: [UsersService],
})
export class UsersModule {}
