import { Module } from '@nestjs/common';
import { MechanicController } from './mechanic.controller';
import { MechanicService } from './mechanic.service';
import { AiModule } from '../ai.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [AiModule, PrismaModule],
  controllers: [MechanicController],
  providers: [MechanicService],
  exports: [MechanicService],
})
export class MechanicModule {}
