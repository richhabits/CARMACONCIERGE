import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Video Call Service
 * Integrates with Zoom, Google Meet, Microsoft Teams, Twilio Video, Agora
 */
@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) { }

  /**
   * Create video call session for garage consultation
   */
  async createVideoSession(
    jobId?: string,
    provider: 'TWILIO' | 'ZOOM' | 'TEAMS' | 'GOOGLE_MEET' = 'TWILIO',
  ) {
    let roomId = '';

    switch (provider) {
      case 'TWILIO':
        const twilioRoom = await this.createTwilioRoom();
        roomId = twilioRoom.sid;
        break;
      case 'ZOOM':
        const zoomMeeting = await this.createZoomMeeting();
        roomId = zoomMeeting.id;
        break;
      default:
        roomId = 'video-' + Date.now();
    }

    const session = await this.prisma.videoCallSession.create({
      data: {
        jobId,
        provider,
        roomId,
        status: 'SCHEDULED',
      },
    });

    return session;
  }

  private async createTwilioRoom() {
    const roomName = `garage-call-${Date.now()}`;
    // In production: actual Twilio API call
    return { sid: roomName, uniqueName: roomName };
  }

  private async createZoomMeeting() {
    // In production: actual Zoom API call
    return {
      id: 'zoom-' + Date.now(),
      join_url: 'https://zoom.us/j/123456789',
    };
  }

  async getSession(sessionId: string) {
    return this.prisma.videoCallSession.findUnique({
      where: { id: sessionId },
    });
  }

  async startSession(sessionId: string) {
    return this.prisma.videoCallSession.update({
      where: { id: sessionId },
      data: {
        status: 'IN_PROGRESS',
        startTime: new Date(),
      },
    });
  }

  async endSession(sessionId: string, recordingUrl?: string) {
    const session = await this.prisma.videoCallSession.findUnique({
      where: { id: sessionId },
    });

    const duration = session?.startTime
      ? Math.floor((Date.now() - new Date(session.startTime).getTime()) / 1000)
      : 0;

    return this.prisma.videoCallSession.update({
      where: { id: sessionId },
      data: {
        status: 'COMPLETED',
        endTime: new Date(),
        duration,
        recordingUrl,
      },
    });
  }

  async getActiveSessions() {
    return this.prisma.videoCallSession.findMany({
      where: {
        status: { in: ['SCHEDULED', 'IN_PROGRESS'] },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
