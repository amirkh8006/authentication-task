import { NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
export type Response<T> = {
    success: boolean;
    message: string;
    data: T;
};
export declare class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
    errorHandler(exception: HttpException, context: ExecutionContext): void;
    responseHandler(res: any, context: ExecutionContext): {
        success: boolean;
        message: any;
        data: any;
    };
}
