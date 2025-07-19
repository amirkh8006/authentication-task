"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const jwt_1 = require("@nestjs/jwt");
const redis_module_1 = require("./database/redis/redis.module");
const redis_service_1 = require("./database/redis/redis.service");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./modules/auth/auth.module");
const dynamicModel_service_1 = require("./common/utils/dynamicModel.service");
const database_service_1 = require("./common/utils/database.service");
const user_module_1 = require("./modules/user/user.module");
const throttler_1 = require("@nestjs/throttler");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 15 * 60 * 1000,
                    limit: 1000,
                },
            ]),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '7d' },
            }),
            redis_module_1.RedisModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            app_service_1.AppService,
            redis_service_1.RedisService,
            dynamicModel_service_1.DynamicModelService,
            database_service_1.DatabaseService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map