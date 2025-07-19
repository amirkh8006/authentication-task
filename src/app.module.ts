import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './database/redis/redis.module';
import { RedisService } from './database/redis/redis.service';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AuthModule } from '@modules/auth/auth.module';
import { DynamicModelService } from '@utils/dynamicModel.service';
import { DatabaseService } from '@utils/database.service';
import { UserModule } from '@modules/user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SentryModule } from '@sentry/nestjs/setup';
import { StatusMonitorModule } from 'nestjs-status-monitor';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 15 * 60 * 1000,
        limit: 1000,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    RedisModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
    RedisService,
    DynamicModelService,
    DatabaseService,
  ],
})
export class AppModule {}
