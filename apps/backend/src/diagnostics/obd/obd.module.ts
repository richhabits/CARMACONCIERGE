import { Module } from '@nestjs/common';
import { ObdController } from './obd.controller';
import { ObdService } from './obd.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { VehiclesModule } from '../../vehicles/vehicles.module';

@Module({
  imports: [PrismaModule, VehiclesModule],
  controllers: [ObdController],
  providers: [ObdService],
  exports: [ObdService],
})
export class ObdModule {}