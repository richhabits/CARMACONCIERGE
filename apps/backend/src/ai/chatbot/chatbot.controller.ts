import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send message to customer service chatbot' })
  async sendMessage(
    @Request() req,
    @Body() body: { message: string; conversationId?: string },
  ) {
    return this.chatbotService.handleMessage(req.user.id, body.message, body.conversationId);
  }
}
