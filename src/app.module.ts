import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@/modules//user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { AccessModule } from '@/modules/access/access.module';
import { InitDbModule } from '@/modules/init-db/init-db.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-test'),
    InitDbModule,
    UsersModule,
    AuthModule,
    AccessModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*');
//   }
// }
export class AppModule {}
