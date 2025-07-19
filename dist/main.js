"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const envPath = process.cwd() + '/.env.' + process.env.NODE_ENV;
dotenv.config({ path: envPath });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const compression = require("compression");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Authentication API')
        .setDescription('The Authentication App API Description')
        .setVersion('1.0')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-doc', app, documentFactory, {
        swaggerOptions: {
            supportedSubmitMethods: [],
        },
        jsonDocumentUrl: '/api-doc-json',
    });
    app.use(compression());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        stopAtFirstError: true,
        exceptionFactory: () => {
            return new common_1.BadRequestException('Invalid Data Provided');
        },
    }));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map