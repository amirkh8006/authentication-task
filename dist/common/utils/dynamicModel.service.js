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
exports.DynamicModelService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database.service");
const user_schema_1 = require("../../database/models/user.schema");
let DynamicModelService = class DynamicModelService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getModel(modelName, schema) {
        const connection = await this.databaseService.getConnectionWithSchemas([
            { name: 'User', schema: user_schema_1.UserSchema },
        ]);
        return connection.model(modelName, schema);
    }
};
exports.DynamicModelService = DynamicModelService;
exports.DynamicModelService = DynamicModelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DynamicModelService);
//# sourceMappingURL=dynamicModel.service.js.map