import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { CreateMessageDto, CreateConversationDto } from './dto/messaging.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messaging')
@UseGuards(JwtAuthGuard)
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post('conversations')
  createConversation(@Body() dto: CreateConversationDto) {
    return this.messagingService.createConversation(dto);
  }

  @Get('conversations')
  getConversations(@Request() req) {
    return this.messagingService.getConversations(req.user.id);
  }

  @Get('conversations/:id')
  getConversation(@Param('id') id: string) {
    return this.messagingService.getConversation(id);
  }

  @Post('messages')
  createMessage(@Request() req, @Body() dto: CreateMessageDto) {
    return this.messagingService.createMessage(req.user.id, dto);
  }

  @Patch('conversations/:id/read')
  markAsRead(@Param('id') id: string, @Request() req) {
    return this.messagingService.markAsRead(id, req.user.id);
  }
}