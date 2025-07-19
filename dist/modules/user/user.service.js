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
exports.UserService = void 0;
const user_schema_1 = require("../../database/models/user.schema");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const dynamicModel_service_1 = require("../../common/utils/dynamicModel.service");
const messages = require("../../common/static/messages.json");
let UserService = class UserService {
    constructor(dynamicModelService, request) {
        this.dynamicModelService = dynamicModelService;
        this.request = request;
    }
    async fetchUser() {
        const UserModel = await this.dynamicModelService.getModel('User', user_schema_1.UserSchema);
        const user = await UserModel.findById(this.request['userId']).select('phone createdAt -_id');
        if (!user) {
            throw new common_1.HttpException(messages.USER_NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            success: true,
            data: user,
            message: messages.DATA_FETCHED,
            status: 200
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [dynamicModel_service_1.DynamicModelService,
        Request])
], UserService);
//# sourceMappingURL=user.service.js.map