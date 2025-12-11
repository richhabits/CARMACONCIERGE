import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@carmaconcierge/shared';

/**
 * Admin Service - Full control and analytics
 */
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  /**
   * Dashboard statistics
   */
  async getDashboardStats() {
    const [
      totalUsers,
      totalVehicles,
      totalJobs,
      totalSuppliers,
      activeJobs,
      completedJobs,
      totalRevenue,
      newUsersThisMonth,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.vehicle.count(),
      this.prisma.job.count(),
      this.prisma.supplier.count(),
      this.prisma.job.count({ where: { status: { in: ['PENDING', 'IN_PROGRESS', 'APPROVED'] } } }),
      this.prisma.job.count({ where: { status: 'COMPLETED' } }),
      this.prisma.payment.aggregate({ where: { status: 'COMPLETED' }, _sum: { amount: true } }),
      this.prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setDate(1)), // First day of current month
          },
        },
      }),
    ]);

    return {
      totalUsers,
      totalVehicles,
      totalJobs,
      totalSuppliers,
      activeJobs,
      completedJobs,
      totalRevenue: totalRevenue._sum.amount || 0,
      newUsersThisMonth,
    };
  }

  /**
   * Jobs by type breakdown
   */
  async getJobsByType() {
    const jobs = await this.prisma.job.groupBy({
      by: ['type'],
      _count: { id: true },
    });

    return jobs.map((j) => ({
      type: j.type,
      count: j._count.id,
    }));
  }

  /**
   * Jobs by status breakdown
   */
  async getJobsByStatus() {
    const jobs = await this.prisma.job.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    return jobs.map((j) => ({
      status: j.status,
      count: j._count.id,
    }));
  }

  /**
   * Revenue analytics
   */
  async getRevenueAnalytics(days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const payments = await this.prisma.payment.findMany({
      where: {
        status: 'COMPLETED',
        createdAt: { gte: since },
      },
      select: {
        amount: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Group by day
    const revenueByDay: Record<string, number> = {};
    payments.forEach((p) => {
      const day = p.createdAt.toISOString().split('T')[0];
      revenueByDay[day] = (revenueByDay[day] || 0) + p.amount;
    });

    return Object.entries(revenueByDay).map(([date, revenue]) => ({
      date,
      revenue,
    }));
  }

  /**
   * User growth analytics
   */
  async getUserGrowth(days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const users = await this.prisma.user.findMany({
      where: {
        createdAt: { gte: since },
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const usersByDay: Record<string, number> = {};
    users.forEach((u) => {
      const day = u.createdAt.toISOString().split('T')[0];
      usersByDay[day] = (usersByDay[day] || 0) + 1;
    });

    return Object.entries(usersByDay).map(([date, count]) => ({
      date,
      newUsers: count,
    }));
  }

  /**
   * Top suppliers by ratings
   */
  async getTopSuppliers(limit: number = 10) {
    return this.prisma.supplier.findMany({
      where: {
        isVerified: true,
        rating: { gt: 0 },
      },
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ],
      take: limit,
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  /**
   * Recent activity log
   */
  async getRecentActivity(limit: number = 20) {
    const [recentJobs, recentUsers, recentPayments] = await Promise.all([
      this.prisma.job.findMany({
        take: limit / 3,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { firstName: true, lastName: true } },
          vehicle: { select: { make: true, model: true } },
        },
      }),
      this.prisma.user.findMany({
        take: limit / 3,
        orderBy: { createdAt: 'desc' },
        select: { id: true, firstName: true, lastName: true, email: true, role: true, createdAt: true },
      }),
      this.prisma.payment.findMany({
        take: limit / 3,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
      }),
    ]);

    const activities = [
      ...recentJobs.map((j) => ({
        type: 'job',
        description: `${j.user.firstName} ${j.user.lastName} created a ${j.type} job for ${j.vehicle.make} ${j.vehicle.model}`,
        timestamp: j.createdAt,
      })),
      ...recentUsers.map((u) => ({
        type: 'user',
        description: `New user registered: ${u.firstName} ${u.lastName} (${u.role})`,
        timestamp: u.createdAt,
      })),
      ...recentPayments.map((p) => ({
        type: 'payment',
        description: `Payment of £${p.amount.toFixed(2)} from ${p.user.firstName} ${p.user.lastName}`,
        timestamp: p.createdAt,
      })),
    ];

    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * System health check
   */
  async getSystemHealth() {
    const dbConnected = await this.prisma.$queryRaw`SELECT 1`;
    
    return {
      status: 'healthy',
      database: dbConnected ? 'connected' : 'disconnected',
      timestamp: new Date(),
    };
  }
}
