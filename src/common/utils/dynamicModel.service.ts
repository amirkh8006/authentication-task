import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseService } from './database.service';
import { UserSchema } from '@models/user.schema';

@Injectable()
export class DynamicModelService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getModel<T>(modelName: string, schema: any): Promise<Model<T>> {
    const connection = await this.databaseService.getConnectionWithSchemas([
      { name: 'User', schema: UserSchema },
    ]);

    return connection.model<T>(modelName, schema);
  }
}
