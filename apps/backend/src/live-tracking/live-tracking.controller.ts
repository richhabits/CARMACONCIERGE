import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { LiveTrackingService } from './live-tracking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('live-tracking')
@Controller('live-tracking')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LiveTrackingController {
  constructor(private readonly liveTrackingService: LiveTrackingService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create live tracking for job' })
  async create(@Request() req, @Body() body: { jobId: string }) {
    return this.liveTrackingService.createTracking(body.jobId, req.user.id);
  }

  @Patch(':jobId/status')
  @ApiOperation({ summary: 'Update service status' })
  async updateStatus(@Param('jobId') jobId: string, @Body() body: { status: string; currentStage?: string }) {
    return this.liveTrackingService.updateStatus(jobId, body.status, body.currentStage);
  }

  @Post(':jobId/photo')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Add photo to live tracking' })
  async addPhoto(@Param('jobId') jobId: string, @UploadedFile() file: Express.Multer.File, @Body() body: { caption?: string }) {
    const photoUrl = `/uploads/${file.filename}`;
    return this.liveTrackingService.addPhoto(jobId, photoUrl, body.caption);
  }

  @Get(':jobId')
  @ApiOperation({ summary: 'Get live tracking for job' })
  async getTracking(@Param('jobId') jobId: string) {
    return this.liveTrackingService.getTracking(jobId);
  }

  @Patch(':jobId/complete')
  @ApiOperation({ summary: 'Complete service' })
  async completeService(@Param('jobId') jobId: string) {
    return this.liveTrackingService.completeService(jobId);
  }
}
