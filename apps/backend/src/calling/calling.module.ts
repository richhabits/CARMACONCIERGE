import { Module } from '@nestjs/common';
import { CallingController } from './calling.controller';
import { CallingService } from './calling.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CallingController],
  providers: [CallingService],
  exports: [CallingService],
})
export class CallingModule {}
