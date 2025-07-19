import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mongoose';

@Injectable()
export class DatabaseService {
  private connections: Map<string, Connection> = new Map();

  async getConnectionWithSchemas(schemas: { name: string; schema: any }[]): Promise<Connection> {
    const dbName = process.env.DB_CONNECTION;

    if (!this.connections.has(dbName)) {
      const connection = await createConnection(dbName);

      schemas.forEach(({ name, schema }) => {
        connection.model(name, schema, name);
      });

      this.connections.set(dbName, connection);
    }

    const connection = this.connections.get(dbName);

    schemas.forEach(({ name, schema }) => {
      if (!connection.models[name]) {
        connection.model(name, schema);
      }
    });

    return connection;
  }
}
