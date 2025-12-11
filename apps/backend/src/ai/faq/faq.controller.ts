import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FaqService } from './faq.service';

@ApiTags('faq')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search FAQs using AI-powered semantic search' })
  async search(@Query('q') query: string) {
    return this.faqService.searchFaqs(query);
  }

  @Get()
  @ApiOperation({ summary: 'Get all FAQs' })
  async getAll(@Query('category') category?: string) {
    return this.faqService.getAllFaqs(category);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get FAQ categories' })
  async getCategories() {
    return this.faqService.getCategories();
  }

  @Post('ask')
  @ApiOperation({ summary: 'Ask a question and get AI-generated answer' })
  async ask(@Body() body: { question: string }) {
    return {
      answer: await this.faqService.generateAnswer(body.question),
    };
  }
}
