import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export default class ResponseInterceptor implements NestInterceptor {
  public intercept(context: any, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    console.log('NestInterceptor:start');

    return next.handle().pipe(
      map((data = {}) => {
        // 获取自定义请求状态码
        const code = context.getArgByIndex(1).statusCode || HttpStatus.OK;
        const message = req.message || '未知错误';
        const logFormat = `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Type: Response
    Response original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    code: ${code}
    data: ${JSON.stringify(data)}
    message: '请求成功'
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
        console.log('NestInterceptor:end');
        console.log(logFormat);
        return {
          code,
          data,
          message: '请求成功',
        };
      }),
    );
    // next.handle();
    // console.log('NestInterceptor:after');
  }
}
