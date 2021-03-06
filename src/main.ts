import { NestFactory } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as express from 'express';
import { logger } from '@/common/middlewares/logger.middlewar';
import { ResponseInterceptor, TimeoutInterceptor } from '@/common/interceptor';
import { RoleAuthGuard } from '@/common/guard';
import { AnyExceptionFilter } from '@/common/filters';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      // options (same as WinstonModule.forRoot() options)
    }),
  });

  app.use(express.json()); // 为了中间件也能解析 application/json
  app.use(express.urlencoded({ extended: true })); // 为了中间件也能解析 application/x-www-form-urlencoded
  app.use(logger); // 日志记录中件间
  app.useGlobalFilters(new AnyExceptionFilter()); // 拦截未知错误
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  // app.useGlobalGuards(new RolesGuard(new Reflector()));
  // eslint-disable-next-line prettier/prettier
  app.useGlobalGuards(new RoleAuthGuard(new Reflector()));
  // app.useGlobalGuards(new (AuthGuard('jwt')));

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );
  // app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter()); // 拦截请求回复
  await app.listen(3000);
}

bootstrap();
