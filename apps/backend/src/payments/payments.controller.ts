import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() data: any, @Request() req: any) {
    const payment = await this.paymentsService.create({ ...data, userId: req.user.id });
    return { success: true, data: payment };
  }

  @Get()
  async findAll(@Request() req: any) {
    const payments = await this.paymentsService.findAll(req.user.id);
    return { success: true, data: payments };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const payment = await this.paymentsService.findOne(id);
    return { success: true, data: payment };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const payment = await this.paymentsService.update(id, data);
    return { success: true, data: payment };
  }
}
