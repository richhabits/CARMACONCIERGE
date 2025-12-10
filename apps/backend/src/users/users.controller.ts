import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    const { password, ...result } = user;
    return { success: true, data: result };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const user = await this.usersService.update(id, data);
    const { password, ...result } = user;
    return { success: true, data: result };
  }
}
