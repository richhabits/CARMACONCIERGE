import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.quote.create({ 
      data,
      include: { supplier: true }
    });
  }

  async findByJob(jobId: string) {
    return this.prisma.quote.findMany({ 
      where: { jobId },
      include: { supplier: true }
    });
  }

  async findOne(id: string) {
    return this.prisma.quote.findUnique({ 
      where: { id },
      include: { supplier: true, job: true }
    });
  }

  async update(id: string, data: any) {
    return this.prisma.quote.update({ 
      where: { id }, 
      data,
      include: { supplier: true }
    });
  }
}
