import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ObdService } from './obd.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('obd-diagnostics')
@Controller('obd')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ObdController {
  constructor(private readonly obdService: ObdService) {}

  @Get('codes/:vehicleId')
  @ApiOperation({ summary: 'Read diagnostic trouble codes from vehicle via OBD' })
  async readCodes(
    @Param('vehicleId') vehicleId: string,
    @Query('adapter') adapter: 'bluetooth' | 'wifi' | 'api' = 'api',
  ) {
    return this.obdService.readDiagnosticCodes(vehicleId, adapter);
  }

  @Get('realtime/:vehicleId')
  @ApiOperation({ summary: 'Get real-time vehicle data via OBD (RPM, speed, temperature, etc.)' })
  async getRealtimeData(
    @Param('vehicleId') vehicleId: string,
    @Query('pids') pids?: string, // Comma-separated list of PIDs
  ) {
    const pidList = pids ? pids.split(',') : [];
    return this.obdService.getRealtimeData(vehicleId, pidList);
  }

  @Post('clear/:vehicleId')
  @ApiOperation({ summary: 'Clear diagnostic trouble codes' })
  async clearCodes(@Param('vehicleId') vehicleId: string) {
    return this.obdService.clearCodes(vehicleId);
  }

  @Get('dtc/:code')
  @ApiOperation({ summary: 'Get description for diagnostic trouble code (DTC)' })
  async getDtcDescription(@Param('code') code: string) {
    return this.obdService.getDtcDescription(code);
  }

  @Get('pids')
  @ApiOperation({ summary: 'Get list of supported OBD PIDs' })
  async getSupportedPids() {
    return this.obdService.getSupportedPids();
  }
}