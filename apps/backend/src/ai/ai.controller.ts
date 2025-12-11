import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate text using free AI models' })
  async generate(@Body() body: { prompt: string; context?: string }) {
    return {
      text: await this.aiService.generateText(body.prompt, body.context),
      model: await this.aiService.getAvailableModel(),
    };
  }

  @Get('models/available')
  @ApiOperation({ summary: 'Check available AI models' })
  async getAvailableModel() {
    return {
      model: await this.aiService.getAvailableModel(),
    };
  }
}
