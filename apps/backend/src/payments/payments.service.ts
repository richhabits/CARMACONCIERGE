import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.payment.create({ 
      data: {
        ...data,
        currency: data.currency || 'GBP',
        status: 'PENDING'
      },
      include: { job: true }
    });
  }

  async findAll(userId: string) {
    return this.prisma.payment.findMany({ 
      where: { userId },
      include: { job: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    return this.prisma.payment.findUnique({ 
      where: { id },
      include: { job: true, user: true }
    });
  }

  async update(id: string, data: any) {
    return this.prisma.payment.update({ 
      where: { id }, 
      data,
      include: { job: true }
    });
  }
}
