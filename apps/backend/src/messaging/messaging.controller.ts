import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagingController {
  constructor(private messagingService: MessagingService) {}

  @Post()
  async create(@Body() data: any, @Request() req: any) {
    const message = await this.messagingService.create({ ...data, senderId: req.user.id });
    return { success: true, data: message };
  }

  @Get()
  async findAll(@Request() req: any) {
    const messages = await this.messagingService.findAll(req.user.id);
    return { success: true, data: messages };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const message = await this.messagingService.findOne(id);
    return { success: true, data: message };
  }

  @Put(':id/read')
  async markAsRead(@Param('id') id: string) {
    const message = await this.messagingService.markAsRead(id);
    return { success: true, data: message };
  }
}
