import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quotes')
@UseGuards(JwtAuthGuard)
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @Post()
  async create(@Body() data: any) {
    const quote = await this.quotesService.create(data);
    return { success: true, data: quote };
  }

  @Get('job/:jobId')
  async findByJob(@Param('jobId') jobId: string) {
    const quotes = await this.quotesService.findByJob(jobId);
    return { success: true, data: quotes };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const quote = await this.quotesService.findOne(id);
    return { success: true, data: quote };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const quote = await this.quotesService.update(id, data);
    return { success: true, data: quote };
  }
}
