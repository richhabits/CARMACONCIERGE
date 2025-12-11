import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { PrismaModule } from './prisma/prisma.module';
import { HttpCacheInterceptor } from './common/interceptors/cache.interceptor';
import { CompressionInterceptor } from './common/interceptors/compression.interceptor';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { JobsModule } from './jobs/jobs.module';
import { QuotesModule } from './quotes/quotes.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { MessagingModule } from './messaging/messaging.module';
import { PaymentsModule } from './payments/payments.module';
import { StorageModule } from './storage/storage.module';
import { AiModule } from './ai/ai.module';
import { RemindersModule } from './reminders/reminders.module';
import { ObdModule } from './diagnostics/obd/obd.module';
import { VideoModule } from './video/video.module';
import { LiveTrackingModule } from './live-tracking/live-tracking.module';
import { AdminModule } from './admin/admin.module';
// import { MarketingModule } from './marketing/marketing.module'; // Has schema mismatches - disabled
import { ScheduleModule } from '@nestjs/schedule';
import { loggerConfig } from './config/logger.config';
import { throttleConfig } from './config/throttle.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    WinstonModule.forRoot(loggerConfig),
    CacheModule.register({
      isGlobal: true,
      ttl: 300,
      max: 100,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: throttleConfig.ttl * 1000,
        limit: throttleConfig.limit,
      },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    VehiclesModule,
    JobsModule,
    QuotesModule,
    SuppliersModule,
    MessagingModule,
    PaymentsModule,
    StorageModule,
    AiModule,
    ObdModule,
    AdminModule,
    // Temporarily disabled - missing Prisma models
    RemindersModule,
    VideoModule,
    LiveTrackingModule,
    // MarketingModule, // Has schema mismatches - disabled
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CompressionInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule { }