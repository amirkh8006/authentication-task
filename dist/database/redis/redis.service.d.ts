import { Redis } from 'ioredis';
export declare class RedisService {
    private readonly redisClient;
    constructor(redisClient: Redis);
    setCache(key: string, value: string, ttl?: number): Promise<void>;
    getCache(key: string): Promise<string | null>;
    deleteCache(key: string): Promise<number>;
    hsetCache(key: string, value: any, ttl?: number): Promise<void>;
}
