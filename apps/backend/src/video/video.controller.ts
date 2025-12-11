import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('video')
@Controller('video')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  @Post('create-session')
  @ApiOperation({ summary: 'Create video call session with garage' })
  async createSession(
    @Request() req,
    @Body() body: {
      jobId?: string;
      provider?: 'TWILIO' | 'ZOOM' | 'TEAMS' | 'GOOGLE_MEET';
    },
  ) {
    return this.videoService.createVideoSession(
      body.jobId,
      body.provider,
    );
  }

  @Get('session/:id')
  @ApiOperation({ summary: 'Get video session details' })
  async getSession(@Param('id') id: string) {
    return this.videoService.getSession(id);
  }

  @Patch('session/:id/start')
  @ApiOperation({ summary: 'Start video session' })
  async startSession(@Param('id') id: string) {
    return this.videoService.startSession(id);
  }

  @Patch('session/:id/end')
  @ApiOperation({ summary: 'End video session' })
  async endSession(@Param('id') id: string, @Body() body: { recordingUrl?: string }) {
    return this.videoService.endSession(id, body.recordingUrl);
  }

  @Get('active-sessions')
  @ApiOperation({ summary: 'Get active video sessions' })
  async getActiveSessions() {
    return this.videoService.getActiveSessions();
  }
}
