import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateJobDto) {
    return this.prisma.job.create({
      data: {
        ...dto,
        userId,
      },
      include: {
        vehicle: true,
        quotes: true,
      },
    });
  }

  async findAll(userId?: string) {
    const where = userId ? { userId } : {};
    return this.prisma.job.findMany({
      where,
      include: {
        vehicle: true,
        quotes: true,
      },
    });
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        vehicle: true,
        quotes: {
          include: {
            supplier: true,
            items: true,
          },
        },
      },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }

  async update(id: string, dto: UpdateJobDto) {
    await this.findOne(id);
    return this.prisma.job.update({
      where: { id },
      data: dto,
      include: {
        vehicle: true,
        quotes: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.job.delete({
      where: { id },
    });
  }
}