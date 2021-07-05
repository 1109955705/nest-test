import { NestFactory } from '@nestjs/core';
import {
  LoggerMiddleware,
  LoggingInterceptor,
  logger,
} from '@/common/middlewares/logger.middlewar';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger);
  app.use(LoggerMiddleware);
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(80);
}

bootstrap();
