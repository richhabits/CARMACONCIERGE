import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { RemindersService } from '../reminders/reminders.service';

@Injectable()
export class VehiclesService {
  constructor(
    private prisma: PrismaService,
    private remindersService: RemindersService,
  ) {}

  async create(userId: string, dto: CreateVehicleDto) {
    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...dto,
        userId,
      },
    });

    // Auto-create reminders when vehicle is added
    await this.remindersService.createVehicleReminders(userId, vehicle.id, {
      make: dto.make,
      model: dto.model,
      registrationNumber: dto.registrationNumber,
    });

    return vehicle;
  }

  async findAll(userId?: string) {
    const where = userId ? { userId } : {};
    return this.prisma.vehicle.findMany({ where });
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(id: string, dto: UpdateVehicleDto) {
    await this.findOne(id);
    return this.prisma.vehicle.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}