import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        ...dto,
        userId,
      },
      include: {
        job: true,
        quote: true,
      },
    });
  }

  async findAll(userId?: string) {
    const where = userId ? { userId } : {};
    return this.prisma.payment.findMany({
      where,
      include: {
        job: true,
        quote: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        job: true,
        quote: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async update(id: string, dto: UpdatePaymentDto) {
    await this.findOne(id);
    return this.prisma.payment.update({
      where: { id },
      data: dto,
      include: {
        job: true,
        quote: true,
      },
    });
  }
}