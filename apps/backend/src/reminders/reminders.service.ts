import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

export interface CreateReminderDto {
  userId: string;
  vehicleId?: string;
  type: 'MOT' | 'SERVICE' | 'INSURANCE' | 'TAX' | 'INSPECTION' | 'CUSTOM';
  title: string;
  description?: string;
  dueDate: Date;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  isRecurring?: boolean;
  recurrenceRule?: string; // RRULE format
}

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);

  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) { }

  /**
   * Create a reminder for user
   */
  async createReminder(dto: CreateReminderDto) {
    return this.prisma.reminder.create({
      data: {
        userId: dto.userId,
        vehicleId: dto.vehicleId,
        type: dto.type as any,
        title: dto.title,
        description: dto.description,
        dueDate: new Date(dto.dueDate),
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            phone: true,
          },
        },
      },
    });
  }

  /**
   * Auto-create reminders when user adds vehicle
   * Creates MOT, Service, Tax, Insurance reminders
   */
  async createVehicleReminders(userId: string, vehicleId: string, vehicleData: any) {
    const now = new Date();
    const reminders = [];

    // MOT Reminder (annual)
    reminders.push({
      userId,
      vehicleId,
      type: 'MOT',
      title: `MOT Due for ${vehicleData.make} ${vehicleData.model}`,
      description: `Your vehicle's MOT is due soon. Book your MOT test now.`,
      dueDate: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
    });

    // Service Reminder (6 months or based on mileage)
    reminders.push({
      userId,
      vehicleId,
      type: 'SERVICE',
      title: `Service Due for ${vehicleData.make} ${vehicleData.model}`,
      description: `Time for your regular service to keep your vehicle running smoothly.`,
      dueDate: new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000), // 6 months
    });

    // Tax Reminder (if UK vehicle)
    reminders.push({
      userId,
      vehicleId,
      type: 'TAX',
      title: `Vehicle Tax Due for ${vehicleData.registrationNumber}`,
      description: `Your vehicle tax is due. Renew to avoid penalties.`,
      dueDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000), // 1 year
    });

    // Insurance Reminder (1 year)
    reminders.push({
      userId,
      vehicleId,
      type: 'INSURANCE',
      title: `Insurance Renewal for ${vehicleData.make} ${vehicleData.model}`,
      description: `Your car insurance is due for renewal. Compare quotes to get the best deal.`,
      dueDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000),
    });

    // Create all reminders
    const created = await Promise.all(
      reminders.map((reminder) => this.createReminder(reminder))
    );

    this.logger.log(`Created ${created.length} reminders for vehicle ${vehicleId}`);
    return created;
  }

  /**
   * Get user's active reminders
   */
  async getUserReminders(userId: string, status?: string) {
    const where: any = { userId };
    if (status) {
      where.status = status;
    } else {
      where.status = 'PENDING';
    }

    return this.prisma.reminder.findMany({
      where,
      orderBy: {
        dueDate: 'asc',
      },
    });
  }

  /**
   * Check and send due reminders (runs every hour)
   */
  @Cron(CronExpression.EVERY_HOUR)
  async checkAndNotifyDueReminders() {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Find reminders due in next 24 hours
    const dueReminders = await this.prisma.reminder.findMany({
      where: {
        status: 'PENDING',
        dueDate: {
          gte: now,
          lte: tomorrow,
        },
        sentAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            phone: true,
          },
        },
      },
    });

    this.logger.log(`Found ${dueReminders.length} reminders due in next 24 hours`);

    // Send notifications
    for (const reminder of dueReminders) {
      try {
        await this.notifications.sendReminderNotification(reminder);

        // Mark as sent
        await this.prisma.reminder.update({
          where: { id: reminder.id },
          data: {
            sentAt: new Date(),
            status: 'SENT',
          },
        });

        this.logger.log(`Sent reminder notification for ${reminder.id}`);
      } catch (error) {
        this.logger.error(`Failed to send reminder ${reminder.id}:`, error);
      }
    }
  }

  /**
   * Update reminder status
   */
  async updateReminderStatus(id: string, status: string) {
    return this.prisma.reminder.update({
      where: { id },
      data: { status: status as any },
    });
  }

  /**
   * Delete reminder
   */
  async deleteReminder(id: string) {
    return this.prisma.reminder.delete({
      where: { id },
    });
  }
}
