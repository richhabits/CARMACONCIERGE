import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.supplier.create({ data });
  }

  async findAll(service?: string) {
    const where = service ? { services: { has: service } } : {};
    return this.prisma.supplier.findMany({ where });
  }

  async findOne(id: string) {
    return this.prisma.supplier.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.supplier.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.supplier.delete({ where: { id } });
  }
}
