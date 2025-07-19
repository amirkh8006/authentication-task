import { UserLoginDto, VerifyUserDto } from '@dto/auth.dto';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as messages from '@static/messages.json';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/database/redis/redis.service';
import { randomInt } from 'crypto';
import { DynamicModelService } from '@utils/dynamicModel.service';
import { User } from '@sentry/nestjs';
import { UserSchema } from '@models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private jwtService: JwtService,
    private redisService: RedisService,
    private readonly dynamicModelService: DynamicModelService,
  ) {}

  async loginUser(userLoginDto: UserLoginDto): Promise<object> {
    const UserModel = await this.dynamicModelService.getModel<User>('User', UserSchema);

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
      throw new HttpException(messages.OTP_SENT, HttpStatus.BAD_REQUEST);
    }

    const verificationCode = randomInt(1000, 9999).toString();

    console.log("Verification Code : ", verificationCode);
    

    await this.redisService.setCache(`verCodes:${userLoginDto.phoneNumber}`, verificationCode, 90);

    return {
      success: true,
      message: messages.SMS_SENT_SUCCESSFULLY,
      status: 200
    };
  }

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<object> {
    const UserModel = await this.dynamicModelService.getModel<User>('User', UserSchema);

    const savedVerCode = await this.redisService.getCache(`verCodes:${verifyUserDto.phoneNumber}`);

    if (!savedVerCode) {
      throw new HttpException(messages.VERCODE_EXPIRED, HttpStatus.UNAUTHORIZED);
    }

    if (savedVerCode != verifyUserDto.verCode) {
      throw new HttpException(messages.INCORRECT_VERCODE, HttpStatus.UNAUTHORIZED);
    }

    const foundUser = await UserModel.findOne({ phone: verifyUserDto.phoneNumber });
    if (!foundUser) {
      throw new HttpException(messages.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
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


  async logOutUser(): Promise<object> {
    await this.redisService.deleteCache(`tokens:${this.request['userId']}`);

    return {
      message: messages.LOGOUT_SUCCESSFUL,
      status: 200
    };
  }
}
