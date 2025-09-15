import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
  TypeORMError,
} from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string;
    let code = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (
        typeof errorResponse === 'object' &&
        'message' in errorResponse
      ) {
        message = Array.isArray(errorResponse.message)
          ? errorResponse.message.join(', ')
          : String(errorResponse.message);
      } else {
        message = 'An error occurred';
      }
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = exception.message;
      code = (exception as any).code;
    } else if (exception instanceof TypeORMError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = exception.message;
    } else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof CannotCreateEntityIdMapError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = exception.message;
      code = (exception as any).code;
    } else if (exception instanceof Error) {
      message = exception.message;
    } else {
      message = 'Unknown error occurred';
    }

    response.status(status).json({
      status,
      message,
      code,
      method: request.method,
    });
  }
}
