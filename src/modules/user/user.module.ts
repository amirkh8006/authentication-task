import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DynamicModelService } from '@utils/dynamicModel.service';
import { DatabaseService } from '@utils/database.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DynamicModelService, DatabaseService],
})
export class UserModule {}
