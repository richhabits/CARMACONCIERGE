import { Module } from '@nestjs/common';
import { MarketingController } from './marketing.controller';
import { MarketingService } from './marketing.service';
import { SocialMediaService } from './social-media.service';
import { EmailMarketingService } from './email-marketing.service';
import { CallingService } from './calling.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule],
  controllers: [MarketingController],
  providers: [
    MarketingService,
    SocialMediaService,
    EmailMarketingService,
    CallingService,
  ],
  exports: [MarketingService, SocialMediaService, CallingService],
})
export class MarketingModule {}
