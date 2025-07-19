"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((res) => this.responseHandler(res, context)), (0, operators_1.catchError)((err) => (0, rxjs_1.throwError)(() => this.errorHandler(err, context))));
    }
    errorHandler(exception, context) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        let status;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
        }
        else {
            console.log('Exception Error => ', exception);
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
        response.status(status).json({
            success: false,
            message: exception.message,
        });
    }
    responseHandler(res, context) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        response.status(res.status);
        if (res) {
            return {
                success: true,
                message: res.message ? res.message : undefined,
                data: res.data ? res.data : undefined,
            };
        }
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map