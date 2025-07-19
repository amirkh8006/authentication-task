import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async setCache(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      try {
        if (this.redisClient.status === 'ready') {
          await this.redisClient.set(key, value, 'EX', ttl);
        } else {
          console.warn('Redis is not connected. Skipping cache operation.');
        }
      } catch (error) {
        console.error('Failed to interact with Redis:', error.message);
      }
    } else {
      try {
        if (this.redisClient.status === 'ready') {
          await this.redisClient.set(key, value);
        } else {
          console.warn('Redis is not connected. Skipping cache operation.');
        }
      } catch (error) {
        console.error('Failed to interact with Redis:', error.message);
      }
    }
  }

  async getCache(key: string): Promise<string | null> {
    try {
      if (this.redisClient.status === 'ready') {
        return await this.redisClient.get(key);
      } else {
        console.warn('Redis is not connected. Skipping cache operation.');
      }
    } catch (error) {
      console.error('Failed to interact with Redis:', error.message);
    }
  }

  async deleteCache(key: string): Promise<number> {
    try {
      if (this.redisClient.status === 'ready') {
        return await this.redisClient.del(key);
      } else {
        console.warn('Redis is not connected. Skipping cache operation.');
      }
    } catch (error) {
      console.error('Failed to interact with Redis:', error.message);
    }
  }

  async hsetCache(key: string, value: any, ttl?: number): Promise<void> {
    if (ttl) {
      try {
        if (this.redisClient.status === 'ready') {
          await this.redisClient.hset(key, 'data', value);
          await this.redisClient.expire(key, ttl);
        } else {
          console.warn('Redis is not connected. Skipping cache operation.');
        }
      } catch (error) {
        console.error('Failed to interact with Redis:', error.message);
      }
    } else {
      try {
        if (this.redisClient.status === 'ready') {
          await this.redisClient.hset(key, 'data', value);
        } else {
          console.warn('Redis is not connected. Skipping cache operation.');
        }
      } catch (error) {
        console.error('Failed to interact with Redis:', error.message);
      }
    }
  }
}
