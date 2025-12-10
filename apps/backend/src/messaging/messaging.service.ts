import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MessagingService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.message.create({ 
      data,
      include: { sender: true, receiver: true }
    });
  }

  async findAll(userId: string) {
    return this.prisma.message.findMany({ 
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: { sender: true, receiver: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    return this.prisma.message.findUnique({ 
      where: { id },
      include: { sender: true, receiver: true, job: true }
    });
  }

  async markAsRead(id: string) {
    return this.prisma.message.update({ 
      where: { id }, 
      data: { read: true }
    });
  }
}
