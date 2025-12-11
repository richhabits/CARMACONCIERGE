import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@carmaconcierge/shared';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard/stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('analytics/jobs-by-type')
  @ApiOperation({ summary: 'Get jobs breakdown by type' })
  async getJobsByType() {
    return this.adminService.getJobsByType();
  }

  @Get('analytics/jobs-by-status')
  @ApiOperation({ summary: 'Get jobs breakdown by status' })
  async getJobsByStatus() {
    return this.adminService.getJobsByStatus();
  }

  @Get('analytics/revenue')
  @ApiOperation({ summary: 'Get revenue analytics' })
  async getRevenue(@Query('days') days?: string) {
    return this.adminService.getRevenueAnalytics(days ? parseInt(days) : 30);
  }

  @Get('analytics/user-growth')
  @ApiOperation({ summary: 'Get user growth analytics' })
  async getUserGrowth(@Query('days') days?: string) {
    return this.adminService.getUserGrowth(days ? parseInt(days) : 30);
  }

  @Get('suppliers/top')
  @ApiOperation({ summary: 'Get top-rated suppliers' })
  async getTopSuppliers(@Query('limit') limit?: string) {
    return this.adminService.getTopSuppliers(limit ? parseInt(limit) : 10);
  }

  @Get('activity/recent')
  @ApiOperation({ summary: 'Get recent activity log' })
  async getRecentActivity(@Query('limit') limit?: string) {
    return this.adminService.getRecentActivity(limit ? parseInt(limit) : 20);
  }

  @Get('health')
  @ApiOperation({ summary: 'System health check' })
  async getHealth() {
    return this.adminService.getSystemHealth();
  }
}
