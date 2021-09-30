import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import {
  LoggerMiddleware,
  LoggingInterceptor,
  logger,
} from '@/common/middlewares/logger.middlewar';
import {
  AnyExceptionFilter,
  HttpExceptionFilter,
} from '@/common/error-interceptor';
import { RolesGuard } from '@/common/guard';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // 为了中间件也能解析 application/json
  app.use(express.urlencoded({ extended: true })); // 为了中间件也能解析 application/x-www-form-urlencoded
  app.use(logger); // 日志记录中件间
  app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter()); // 捕获未知错误的拦截器

  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}

bootstrap();
