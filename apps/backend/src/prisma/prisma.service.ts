import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'warn' },
      ],
      errorFormat: 'minimal',
    });

    // Log slow queries (> 1 second)
    this.$on('query' as never, (e: any) => {
      if (e.duration > 1000) {
        this.logger.warn(`Slow query (${e.duration}ms): ${e.query}`);
      }
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Database connected');
    } catch (error) {
      this.logger.error('❌ Database connection failed', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }

  /**
   * Optimized findMany with pagination
   */
  async findManyPaginated<T>(
    model: any,
    args: any,
    page: number = 1,
    pageSize: number = 20,
  ): Promise<{ data: T[]; total: number; page: number; pageSize: number; totalPages: number }> {
    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
      model.findMany({
        ...args,
        skip,
        take: pageSize,
      }),
      model.count({ where: args.where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}