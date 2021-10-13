import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { AccessDao } from './access.dao';
import { Access, AccessSchema } from './access.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      // 指定collection是因为mongoose会对数据库某些名字自动+s
      { name: Access.name, schema: AccessSchema, collection: 'access' },
    ]),
  ],
  controllers: [AccessController],
  providers: [AccessService, AccessDao],
  exports: [AccessService],
})
export class AccessModule {}
