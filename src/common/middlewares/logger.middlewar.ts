import {
  Injectable,
  NestMiddleware,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// 类中间件
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

// 拦截器
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...', context);

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; // 响应状态码
  console.log('1111111111111111');
  next();
  // 组装日志信息
  const logFormat = `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Type: Request
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
  console.log(logFormat);
}
