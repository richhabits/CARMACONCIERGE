import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LiveTrackingGateway } from './live-tracking.gateway';

@Injectable()
export class LiveTrackingService {
  private readonly logger = new Logger(LiveTrackingService.name);

  constructor(
    private prisma: PrismaService,
    private gateway: LiveTrackingGateway,
  ) {}

  async createTracking(jobId: string, supplierId: string) {
    const tracking = await this.prisma.serviceLiveTracking.create({
      data: { jobId, status: 'WAITING', technicianName: null },
      include: { job: { include: { vehicle: true, user: true } } },
    });
    this.gateway.notifyTrackingStarted(tracking.job.userId, tracking);
    return tracking;
  }

  async updateStatus(jobId: string, status: any, currentStage?: string) {
    const tracking = await this.prisma.serviceLiveTracking.update({
      where: { jobId },
      data: { status, currentStage, lastUpdate: new Date() },
      include: { job: { include: { vehicle: true, user: true } } },
    });
    this.gateway.notifyStatusUpdate(tracking.job.userId, tracking);
    return tracking;
  }

  async addPhoto(jobId: string, photoUrl: string, caption?: string) {
    const tracking = await this.prisma.serviceLiveTracking.findUnique({
      where: { jobId },
      include: { job: { include: { user: true } } },
    });
    const updated = await this.prisma.serviceLiveTracking.update({
      where: { jobId },
      data: {
        photos: [...tracking.photos, photoUrl],
        notes: caption ? `${tracking.notes || ''}\n${caption}` : tracking.notes,
        lastUpdate: new Date(),
      },
    });
    this.gateway.notifyNewPhoto(tracking.job.userId, { jobId, photoUrl, caption });
    return updated;
  }

  async addVideo(jobId: string, videoUrl: string, caption?: string) {
    const tracking = await this.prisma.serviceLiveTracking.findUnique({
      where: { jobId },
      include: { job: { include: { user: true } } },
    });
    const updated = await this.prisma.serviceLiveTracking.update({
      where: { jobId },
      data: {
        videos: [...tracking.videos, videoUrl],
        notes: caption ? `${tracking.notes || ''}\n${caption}` : tracking.notes,
        lastUpdate: new Date(),
      },
    });
    this.gateway.notifyNewVideo(tracking.job.userId, { jobId, videoUrl, caption });
    return updated;
  }

  async setTechnician(jobId: string, technicianName: string) {
    const tracking = await this.prisma.serviceLiveTracking.update({
      where: { jobId },
      data: { technicianName, lastUpdate: new Date() },
      include: { job: { include: { user: true } } },
    });
    this.gateway.notifyTechnicianAssigned(tracking.job.userId, { jobId, technicianName });
    return tracking;
  }

  async setEstimatedCompletion(jobId: string, estimatedCompletion: Date) {
    const tracking = await this.prisma.serviceLiveTracking.update({
      where: { jobId },
      data: { estimatedCompletion: new Date(estimatedCompletion), lastUpdate: new Date() },
      include: { job: { include: { user: true } } },
    });
    this.gateway.notifyEstimateUpdate(tracking.job.userId, { jobId, estimatedCompletion });
    return tracking;
  }

  async addNote(jobId: string, note: string) {
    const tracking = await this.prisma.serviceLiveTracking.findUnique({
      where: { jobId },
      include: { job: { include: { user: true } } },
    });
    const updated = await this.prisma.serviceLiveTracking.update({
      where: { jobId },
      data: {
        notes: `${tracking.notes || ''}\n[${new Date().toISOString()}] ${note}`,
        lastUpdate: new Date(),
      },
    });
    this.gateway.notifyNewNote(tracking.job.userId, { jobId, note, timestamp: new Date() });
    return updated;
  }

  async getTracking(jobId: string) {
    return this.prisma.serviceLiveTracking.findUnique({
      where: { jobId },
      include: { job: { include: { vehicle: true, user: true } } },
    });
  }

  async completeService(jobId: string) {
    const tracking = await this.prisma.serviceLiveTracking.update({
      where: { jobId },
      data: { status: 'COMPLETE', lastUpdate: new Date() },
      include: { job: { include: { user: true } } },
    });
    await this.prisma.job.update({
      where: { id: jobId },
      data: { status: 'COMPLETED', completedDate: new Date() },
    });
    this.gateway.notifyServiceComplete(tracking.job.userId, tracking);
    return tracking;
  }
}
