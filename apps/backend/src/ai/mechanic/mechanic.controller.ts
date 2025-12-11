import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MechanicService } from './mechanic.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('ai-mechanic')
@Controller('ai-mechanic')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MechanicController {
  constructor(private readonly mechanicService: MechanicService) {}

  @Post('diagnose')
  @ApiOperation({ summary: 'Diagnose vehicle issue using AI' })
  async diagnose(
    @Request() req,
    @Body() body: { vehicleId: string; issue: string; symptoms: string[] },
  ) {
    return this.mechanicService.diagnoseIssue(
      req.user.id,
      body.vehicleId,
      body.issue,
      body.symptoms,
    );
  }

  @Get('vehicle/:vehicleId')
  @ApiOperation({ summary: 'Get diagnostic history for vehicle' })
  async getVehicleDiagnostics(@Param('vehicleId') vehicleId: string) {
    return this.mechanicService.getVehicleDiagnostics(vehicleId);
  }

  @Get('my-diagnostics')
  @ApiOperation({ summary: 'Get user diagnostic history' })
  async getUserDiagnostics(@Request() req) {
    return this.mechanicService.getUserDiagnostics(req.user.id);
  }
}
