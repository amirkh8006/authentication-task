import { Model } from 'mongoose';
import { DatabaseService } from './database.service';
export declare class DynamicModelService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    getModel<T>(modelName: string, schema: any): Promise<Model<T>>;
}
