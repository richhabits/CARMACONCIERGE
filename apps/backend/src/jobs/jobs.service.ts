import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.job.create({ 
      data,
      include: { vehicle: true, quotes: true }
    });
  }

  async findAll(userId: string) {
    return this.prisma.job.findMany({ 
      where: { userId },
      include: { vehicle: true, quotes: true }
    });
  }

  async findOne(id: string) {
    return this.prisma.job.findUnique({ 
      where: { id },
      include: { vehicle: true, quotes: true, supplier: true }
    });
  }

  async update(id: string, data: any) {
    return this.prisma.job.update({ 
      where: { id }, 
      data,
      include: { vehicle: true, quotes: true }
    });
  }

  async remove(id: string) {
    return this.prisma.job.delete({ where: { id } });
  }
}
