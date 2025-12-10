import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  async create(@Body() data: any, @Request() req: any) {
    const job = await this.jobsService.create({ ...data, userId: req.user.id });
    return { success: true, data: job };
  }

  @Get()
  async findAll(@Request() req: any) {
    const jobs = await this.jobsService.findAll(req.user.id);
    return { success: true, data: jobs };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const job = await this.jobsService.findOne(id);
    return { success: true, data: job };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const job = await this.jobsService.update(id, data);
    return { success: true, data: job };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.jobsService.remove(id);
    return { success: true, message: 'Job deleted successfully' };
  }
}
