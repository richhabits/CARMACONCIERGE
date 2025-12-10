import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.vehicle.create({ data });
  }

  async findAll(userId: string) {
    return this.prisma.vehicle.findMany({ where: { userId } });
  }

  async findOne(id: string) {
    return this.prisma.vehicle.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.vehicle.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.vehicle.delete({ where: { id } });
  }
}
