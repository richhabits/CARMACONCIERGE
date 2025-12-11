import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Send reminder notification via push/email/SMS
   */
  async sendReminderNotification(reminder: any) {
    const user = reminder.user;
    const vehicle = reminder.vehicle;

    const message = this.buildReminderMessage(reminder, vehicle);

    // Send push notification
    await this.sendPushNotification(user.id, {
      title: reminder.title,
      body: message,
      data: {
        type: 'reminder',
        reminderId: reminder.id,
        vehicleId: reminder.vehicleId,
      },
    });

    // Send email if user has email
    if (user.email) {
      await this.sendEmailNotification(user.email, reminder.title, message);
    }

    // Send SMS if user has phone and high priority
    if (user.phone && (reminder.priority === 'HIGH' || reminder.priority === 'URGENT')) {
      await this.sendSMSNotification(user.phone, message);
    }

    this.logger.log(`Sent reminder notification for ${reminder.id}`);
  }

  private buildReminderMessage(reminder: any, vehicle: any): string {
    const vehicleInfo = vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.registrationNumber})` : 'your vehicle';
    const dueDate = new Date(reminder.dueDate).toLocaleDateString('en-GB');

    switch (reminder.type) {
      case 'MOT':
        return `MOT due for ${vehicleInfo} on ${dueDate}. Book your MOT test now to avoid penalties.`;
      case 'SERVICE':
        return `Service due for ${vehicleInfo} on ${dueDate}. Keep your vehicle in top condition.`;
      case 'INSURANCE':
        return `Insurance renewal for ${vehicleInfo} due on ${dueDate}. Compare quotes for the best deal.`;
      case 'TAX':
        return `Vehicle tax for ${vehicleInfo} due on ${dueDate}. Renew now to avoid fines.`;
      default:
        return `${reminder.title} - Due on ${dueDate}`;
    }
  }

  private async sendPushNotification(userId: string, payload: any) {
    // Implementation would use Firebase Cloud Messaging or similar
    this.logger.log(`Push notification to user ${userId}: ${payload.title}`);
    // In production: await fcm.send(userId, payload);
  }

  private async sendEmailNotification(email: string, subject: string, body: string) {
    // Implementation would use SendGrid, AWS SES, or similar
    this.logger.log(`Email to ${email}: ${subject}`);
    // In production: await emailService.send(email, subject, body);
  }

  private async sendSMSNotification(phone: string, message: string) {
    // Implementation would use Twilio, AWS SNS, or similar
    this.logger.log(`SMS to ${phone}: ${message}`);
    // In production: await smsService.send(phone, message);
  }
}
