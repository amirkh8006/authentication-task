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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const messages = require("../../common/static/messages.json");
const jwt_1 = require("@nestjs/jwt");
const redis_service_1 = require("../../database/redis/redis.service");
const crypto_1 = require("crypto");
const dynamicModel_service_1 = require("../../common/utils/dynamicModel.service");
const user_schema_1 = require("../../database/models/user.schema");
let AuthService = class AuthService {
    constructor(request, jwtService, redisService, dynamicModelService) {
        this.request = request;
        this.jwtService = jwtService;
        this.redisService = redisService;
        this.dynamicModelService = dynamicModelService;
    }
    async loginUser(userLoginDto) {
        const UserModel = await this.dynamicModelService.getModel('User', user_schema_1.UserSchema);
        const foundUser = await UserModel.findOne({ phone: userLoginDto.phoneNumber });
        if (!foundUser) {
            const newUser = {
                phone: userLoginDto.phoneNumber,
            };
            const createdUser = new UserModel(newUser);
            await createdUser.save();
        }
        const existsToken = await this.redisService.getCache(`verCodes:${userLoginDto.phoneNumber}`);
        if (existsToken) {
            throw new common_1.HttpException(messages.OTP_SENT, common_1.HttpStatus.BAD_REQUEST);
        }
        const verificationCode = (0, crypto_1.randomInt)(1000, 9999).toString();
        console.log("Verification Code : ", verificationCode);
        await this.redisService.setCache(`verCodes:${userLoginDto.phoneNumber}`, verificationCode, 90);
        return {
            success: true,
            message: messages.SMS_SENT_SUCCESSFULLY,
            status: 200
        };
    }
    async verifyUser(verifyUserDto) {
        const UserModel = await this.dynamicModelService.getModel('User', user_schema_1.UserSchema);
        const savedVerCode = await this.redisService.getCache(`verCodes:${verifyUserDto.phoneNumber}`);
        if (!savedVerCode) {
            throw new common_1.HttpException(messages.VERCODE_EXPIRED, common_1.HttpStatus.UNAUTHORIZED);
        }
        if (savedVerCode != verifyUserDto.verCode) {
            throw new common_1.HttpException(messages.INCORRECT_VERCODE, common_1.HttpStatus.UNAUTHORIZED);
        }
        const foundUser = await UserModel.findOne({ phone: verifyUserDto.phoneNumber });
        if (!foundUser) {
            throw new common_1.HttpException(messages.USER_NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        }
        const token = await this.jwtService.signAsync({ userId: foundUser._id }, { secret: process.env.JWT_SECRET, expiresIn: '7d' });
        await this.redisService.setCache(`tokens:${foundUser._id}`, token, 604800);
        return {
            success: true,
            data: {
                token
            },
            message: messages.LOGIN_SUCCESSFUL,
            status: 200
        };
    }
    async logOutUser() {
        await this.redisService.deleteCache(`tokens:${this.request['userId']}`);
        return {
            message: messages.LOGOUT_SUCCESSFUL,
            status: 200
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Request,
        jwt_1.JwtService,
        redis_service_1.RedisService,
        dynamicModel_service_1.DynamicModelService])
], AuthService);
//# sourceMappingURL=auth.service.js.map