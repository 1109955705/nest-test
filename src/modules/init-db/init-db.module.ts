import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccessModule } from '../access/access.module';
import { UsersModule } from '../user/user.module';
import { InitDbService } from './init-db.service';

@Module({
  imports: [UsersModule, AccessModule, AuthModule],
  providers: [InitDbService],
})
export class InitDbModule {}
