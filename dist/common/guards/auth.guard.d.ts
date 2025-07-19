import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DynamicModelService } from '@utils/dynamicModel.service';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/database/redis/redis.service';
export declare class AuthGuard implements CanActivate {
    private reflector;
    private jwtService;
    private readonly dynamicModelService;
    private readonly redisService;
    constructor(reflector: Reflector, jwtService: JwtService, dynamicModelService: DynamicModelService, redisService: RedisService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
