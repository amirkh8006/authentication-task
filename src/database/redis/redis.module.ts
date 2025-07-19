import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
          retryStrategy: (times) => {
            // Retry every 2 seconds, up to 10 retries
            if (times > 10) {
              return null; // Stop retrying
            }
            return Math.min(times * 2000, 10000);
          },
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
