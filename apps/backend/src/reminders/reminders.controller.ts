import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RemindersService } from './reminders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('reminders')
@Controller('reminders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a reminder' })
  async create(@Request() req, @Body() body: any) {
    return this.remindersService.createReminder({
      ...body,
      userId: req.user.id,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get user reminders' })
  async getUserReminders(@Request() req, @Body() body: { status?: string }) {
    return this.remindersService.getUserReminders(req.user.id, body?.status);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update reminder status' })
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.remindersService.updateReminderStatus(id, body.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete reminder' })
  async delete(@Param('id') id: string) {
    return this.remindersService.deleteReminder(id);
  }
}
