import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/live-tracking',
})
export class LiveTrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(LiveTrackingGateway.name);
  private userSockets = new Map<string, string>();

  handleConnection(client: Socket) {
    this.logger.log(`Live tracking client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Live tracking client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe-job')
  handleSubscribeJob(client: Socket, data: { jobId: string; userId: string }) {
    client.join(`job:${data.jobId}`);
    this.userSockets.set(data.userId, client.id);
  }

  notifyTrackingStarted(userId: string, tracking: any) {
    this.server.to(`job:${tracking.jobId}`).emit('tracking-started', tracking);
  }

  notifyStatusUpdate(userId: string, tracking: any) {
    this.server.to(`job:${tracking.jobId}`).emit('status-update', tracking);
  }

  notifyNewPhoto(userId: string, data: any) {
    this.server.to(`job:${data.jobId}`).emit('new-photo', data);
  }

  notifyNewVideo(userId: string, data: any) {
    this.server.to(`job:${data.jobId}`).emit('new-video', data);
  }

  notifyTechnicianAssigned(userId: string, data: any) {
    this.server.to(`job:${data.jobId}`).emit('technician-assigned', data);
  }

  notifyEstimateUpdate(userId: string, data: any) {
    this.server.to(`job:${data.jobId}`).emit('estimate-update', data);
  }

  notifyNewNote(userId: string, data: any) {
    this.server.to(`job:${data.jobId}`).emit('new-note', data);
  }

  notifyServiceComplete(userId: string, tracking: any) {
    this.server.to(`job:${tracking.jobId}`).emit('service-complete', tracking);
  }
}
