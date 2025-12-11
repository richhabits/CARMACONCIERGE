import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto, UpdateQuoteDto } from './dto/quote.dto';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  async create(supplierId: string, dto: CreateQuoteDto) {
    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    ) + (dto.laborHours && dto.laborRate ? dto.laborHours * dto.laborRate : 0);

    const quote = await this.prisma.quote.create({
      data: {
        ...dto,
        supplierId,
        totalAmount,
        validUntil: new Date(dto.validUntil),
        items: {
          create: dto.items.map((item) => ({
            ...item,
            total: item.quantity * item.unitPrice,
          })),
        },
      },
      include: {
        items: true,
        supplier: true,
        job: true,
      },
    });

    return quote;
  }

  async findAll(jobId?: string, supplierId?: string) {
    const where: any = {};
    if (jobId) where.jobId = jobId;
    if (supplierId) where.supplierId = supplierId;

    return this.prisma.quote.findMany({
      where,
      include: {
        items: true,
        supplier: true,
        job: true,
      },
    });
  }

  async findOne(id: string) {
    const quote = await this.prisma.quote.findUnique({
      where: { id },
      include: {
        items: true,
        supplier: true,
        job: {
          include: {
            vehicle: true,
          },
        },
      },
    });

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    return quote;
  }

  async update(id: string, dto: UpdateQuoteDto) {
    await this.findOne(id);
    
    const updateData: any = { ...dto };
    if (dto.validUntil) {
      updateData.validUntil = new Date(dto.validUntil);
    }

    if (dto.items) {
      const totalAmount = dto.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      ) + (dto.laborHours && dto.laborRate ? dto.laborHours * dto.laborRate : 0);
      updateData.totalAmount = totalAmount;
    }

    return this.prisma.quote.update({
      where: { id },
      data: updateData,
      include: {
        items: true,
        supplier: true,
        job: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.quote.delete({
      where: { id },
    });
  }
}