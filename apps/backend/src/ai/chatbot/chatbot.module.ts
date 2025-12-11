import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { AiModule } from '../ai.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [AiModule, PrismaModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
