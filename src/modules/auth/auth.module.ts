import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from '@utils/database.service';
import { DynamicModelService } from '@utils/dynamicModel.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DynamicModelService, DatabaseService],
})
export class AuthModule {}
