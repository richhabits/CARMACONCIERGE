import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { AiModule } from '../ai.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [AiModule, PrismaModule],
  controllers: [FaqController],
  providers: [FaqService],
  exports: [FaqService],
})
export class FaqModule {}
