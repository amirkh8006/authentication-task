import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as Sentry from '@sentry/nestjs';
export type Response<T> = {
  success: boolean;
  message: string;
  data: T;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => throwError(() => this.errorHandler(err, context))),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    let status;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else {
      console.log('Exception Error => ', exception);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      success: false,
      message: exception.message,
    });
  }

  responseHandler(res: any, context: ExecutionContext) {

    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    response.status(res.status)
    
    if (res) {
      return {
        success: true,
        message: res.message ? res.message : undefined,
        data: res.data ? res.data : undefined,
      };
    }
  }
}
