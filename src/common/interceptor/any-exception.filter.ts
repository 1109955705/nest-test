import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log('AllExceptionsFilter', exception);
    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            code: 500,
            message: '未知错误',
          };
    let message =
      exceptionResponse instanceof Object
        ? (exceptionResponse as any).message
        : exceptionResponse;
    message = Array.isArray(message) ? message[message.length - 1] : message;
    console.log('AllExceptionsFilter', status, message);
    response.status(status).json({
      code: status,
      data: {},
      message,
    });
  }
}
