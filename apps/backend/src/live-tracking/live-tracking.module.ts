import { Module } from '@nestjs/common';
import { LiveTrackingController } from './live-tracking.controller';
import { LiveTrackingService } from './live-tracking.service';
import { LiveTrackingGateway } from './live-tracking.gateway';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [LiveTrackingController],
  providers: [LiveTrackingService, LiveTrackingGateway],
  exports: [LiveTrackingService, LiveTrackingGateway],
})
export class LiveTrackingModule {}
