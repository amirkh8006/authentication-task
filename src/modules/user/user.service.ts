import { User, UserSchema } from '@models/user.schema';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DynamicModelService } from '@utils/dynamicModel.service';
import * as messages from '@static/messages.json';

@Injectable()
export class UserService {
  constructor(
    private readonly dynamicModelService: DynamicModelService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async fetchUser(): Promise<object> {
    const UserModel = await this.dynamicModelService.getModel<User>('User', UserSchema);

    const user = await UserModel.findById(this.request['userId']).select('phone createdAt -_id')

    if (!user) {
      throw new HttpException(messages.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    return { 
      success: true,
      data: user,
      message: messages.DATA_FETCHED,
      status: 200
    };
  }
}
