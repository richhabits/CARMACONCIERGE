import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('suppliers')
@UseGuards(JwtAuthGuard)
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Post()
  async create(@Body() data: any) {
    const supplier = await this.suppliersService.create(data);
    return { success: true, data: supplier };
  }

  @Get()
  async findAll(@Query('service') service?: string) {
    const suppliers = await this.suppliersService.findAll(service);
    return { success: true, data: suppliers };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const supplier = await this.suppliersService.findOne(id);
    return { success: true, data: supplier };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const supplier = await this.suppliersService.update(id, data);
    return { success: true, data: supplier };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.suppliersService.remove(id);
    return { success: true, message: 'Supplier deleted successfully' };
  }
}
