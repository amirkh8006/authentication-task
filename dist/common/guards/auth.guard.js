"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const messages = require("../static/messages.json");
const dynamicModel_service_1 = require("../utils/dynamicModel.service");
const core_1 = require("@nestjs/core");
const redis_service_1 = require("../../database/redis/redis.service");
let AuthGuard = class AuthGuard {
    constructor(reflector, jwtService, dynamicModelService, redisService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.dynamicModelService = dynamicModelService;
        this.redisService = redisService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        if (!token) {
            throw new common_1.HttpException(messages.UNAUTHORIZED, common_1.HttpStatus.UNAUTHORIZED);
        }
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
        }
        catch {
            throw new common_1.HttpException(messages.INVALID_TOKEN, common_1.HttpStatus.UNAUTHORIZED);
        }
        const tokenFromRedis = await this.redisService.getCache(`tokens:${payload.userId}`);
        if (!tokenFromRedis) {
            throw new common_1.HttpException(messages.EXPIRED_TOKEN, common_1.HttpStatus.UNAUTHORIZED);
        }
        if (tokenFromRedis != token) {
            throw new common_1.HttpException(messages.INVALID_TOKEN, common_1.HttpStatus.UNAUTHORIZED);
        }
        request['userId'] = payload.userId;
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        dynamicModel_service_1.DynamicModelService,
        redis_service_1.RedisService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map