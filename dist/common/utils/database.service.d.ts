import { Connection } from 'mongoose';
export declare class DatabaseService {
    private connections;
    getConnectionWithSchemas(schemas: {
        name: string;
        schema: any;
    }[]): Promise<Connection>;
}
