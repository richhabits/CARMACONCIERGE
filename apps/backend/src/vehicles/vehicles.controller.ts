import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vehicles')
@UseGuards(JwtAuthGuard)
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() data: any, @Request() req: any) {
    const vehicle = await this.vehiclesService.create({ ...data, userId: req.user.id });
    return { success: true, data: vehicle };
  }

  @Get()
  async findAll(@Request() req: any) {
    const vehicles = await this.vehiclesService.findAll(req.user.id);
    return { success: true, data: vehicles };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vehicle = await this.vehiclesService.findOne(id);
    return { success: true, data: vehicle };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const vehicle = await this.vehiclesService.update(id, data);
    return { success: true, data: vehicle };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.vehiclesService.remove(id);
    return { success: true, message: 'Vehicle deleted successfully' };
  }
}
