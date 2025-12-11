import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto, UpdateQuoteDto } from './dto/quote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagingGateway } from '../messaging/messaging.gateway';

@ApiTags('quotes')
@Controller('quotes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QuotesController {
  constructor(
    private readonly quotesService: QuotesService,
    private readonly messagingGateway: MessagingGateway,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quote' })
  async create(@Request() req, @Body() createQuoteDto: CreateQuoteDto) {
    const quote = await this.quotesService.create(req.user.id, createQuoteDto);
    // Notify via WebSocket
    this.messagingGateway.notifyQuoteUpdate(createQuoteDto.jobId, quote);
    return quote;
  }

  @Get()
  @ApiOperation({ summary: 'Get all quotes' })
  findAll(@Query('jobId') jobId?: string, @Query('supplierId') supplierId?: string) {
    return this.quotesService.findAll(jobId, supplierId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quote by ID' })
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quote' })
  async update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    const quote = await this.quotesService.update(id, updateQuoteDto);
    // Notify via WebSocket
    if (quote.jobId) {
      this.messagingGateway.notifyQuoteUpdate(quote.jobId, quote);
    }
    return quote;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quote' })
  remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }
}