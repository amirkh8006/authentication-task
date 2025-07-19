import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as messages from '@static/messages.json';
import { DynamicModelService } from '@utils/dynamicModel.service';
import { User, UserSchema } from '@models/user.schema';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/database/redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly dynamicModelService: DynamicModelService,
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const token = request.headers['authorization'];
    
    if (!token) {
      throw new HttpException(messages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new HttpException(messages.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    const tokenFromRedis = await this.redisService.getCache(`tokens:${payload.userId}`);

    if (!tokenFromRedis) {
      throw new HttpException(messages.EXPIRED_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    if (tokenFromRedis != token) {
      throw new HttpException(messages.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    request['userId'] = payload.userId;

    return true;
  }
}
