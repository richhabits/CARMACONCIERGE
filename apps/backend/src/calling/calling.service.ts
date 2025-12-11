import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Calling System - Inbound & Outbound Sales Calls
 * Uses Twilio for voice calls
 */
@Injectable()
export class CallingService {
  private readonly logger = new Logger(CallingService.name);
  private twilio: any;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    // Initialize Twilio
    const accountSid = this.config.get('TWILIO_ACCOUNT_SID');
    const authToken = this.config.get('TWILIO_AUTH_TOKEN');
    
    if (accountSid && authToken) {
      this.twilio = require('twilio')(accountSid, authToken);
    }
  }

  /**
   * Make outbound sales call to lead
   */
  async callLead(leadId: string, agentId: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead.contactPhone) {
      throw new Error('No phone number for lead');
    }

    // Create call record
    const callRecord = await this.prisma.call.create({
      data: {
        leadId,
        agentId,
        direction: 'OUTBOUND',
        phoneNumber: lead.contactPhone,
        status: 'INITIATED',
      },
    });

    try {
      // Make call via Twilio
      const call = await this.twilio.calls.create({
        url: `${this.config.get('BASE_URL')}/calling/twiml/outbound/${callRecord.id}`,
        to: lead.contactPhone,
        from: this.config.get('TWILIO_PHONE_NUMBER'),
        record: true, // Record call
        statusCallback: `${this.config.get('BASE_URL')}/calling/webhook/status`,
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
      });

      // Update with Twilio SID
      await this.prisma.call.update({
        where: { id: callRecord.id },
        data: {
          twilioSid: call.sid,
          status: 'RINGING',
        },
      });

      this.logger.log(`Outbound call initiated to lead ${leadId}`);
      return callRecord;
    } catch (error) {
      await this.prisma.call.update({
        where: { id: callRecord.id },
        data: { status: 'FAILED', notes: error.message },
      });
      throw error;
    }
  }

  /**
   * Handle inbound call
   */
  async handleInboundCall(from: string, callSid: string) {
    // Create call record
    const callRecord = await this.prisma.call.create({
      data: {
        direction: 'INBOUND',
        phoneNumber: from,
        twilioSid: callSid,
        status: 'RINGING',
      },
    });

    // Check if caller is existing customer
    const user = await this.prisma.user.findFirst({
      where: { phone: from },
      include: { vehicles: true },
    });

    if (user) {
      await this.prisma.call.update({
        where: { id: callRecord.id },
        data: { userId: user.id },
      });
    }

    return { callRecord, user };
  }

  /**
   * Generate TwiML for outbound call script
   */
  getOutboundCallScript(callId: string, lead: any) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-GB">
    Hello, this is CARMACONCIERGE calling about your recent enquiry for ${lead.serviceType} service.
  </Say>
  <Pause length="1"/>
  <Say voice="alice" language="en-GB">
    We have trusted garages in your area ready to help. 
    Press 1 to speak to our team, or press 2 to receive a text message with a booking link.
  </Say>
  <Gather numDigits="1" action="/calling/webhook/gather/${callId}" method="POST">
    <Pause length="5"/>
  </Gather>
  <Say voice="alice" language="en-GB">
    We didn't receive your selection. We'll send you a text message instead. Goodbye!
  </Say>
  <Sms from="${this.config.get('TWILIO_PHONE_NUMBER')}" to="${lead.contactPhone}">
    Hi! Book your ${lead.serviceType} service at: https://carmaconcierge.com/book/${lead.id}
  </Sms>
</Response>`;
  }

  /**
   * Generate TwiML for inbound call routing
   */
  getInboundCallScript(user: any) {
    if (user) {
      // Existing customer - personalized greeting
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-GB">
    Welcome back ${user.firstName}! 
  </Say>
  <Pause length="1"/>
  <Say voice="alice" language="en-GB">
    Press 1 for bookings, 2 for existing jobs, 3 for support, or stay on the line to speak to our team.
  </Say>
  <Gather numDigits="1" action="/calling/webhook/menu" method="POST" timeout="10">
    <Pause length="10"/>
  </Gather>
  <Say voice="alice" language="en-GB">
    Connecting you to our team now.
  </Say>
  <Dial timeout="30" callerId="${this.config.get('TWILIO_PHONE_NUMBER')}">
    <Number>+441234567890</Number>
  </Dial>
</Response>`;
    } else {
      // New caller
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-GB">
    Thank you for calling CARMACONCIERGE, the UK's smartest car service platform.
  </Say>
  <Pause length="1"/>
  <Say voice="alice" language="en-GB">
    Press 1 to book an MOT, 2 for a service, 3 for a repair quote, or stay on the line for our team.
  </Say>
  <Gather numDigits="1" action="/calling/webhook/menu" method="POST" timeout="10">
    <Pause length="10"/>
  </Gather>
  <Say voice="alice" language="en-GB">
    Connecting you to our team now.
  </Say>
  <Dial timeout="30" callerId="${this.config.get('TWILIO_PHONE_NUMBER')}">
    <Number>+441234567890</Number>
  </Dial>
</Response>`;
    }
  }

  /**
   * Update call status from Twilio webhook
   */
  async updateCallStatus(twilioSid: string, status: string, duration?: number, recordingUrl?: string) {
    const call = await this.prisma.call.findFirst({
      where: { twilioSid },
    });

    if (call) {
      await this.prisma.call.update({
        where: { id: call.id },
        data: {
          status: status.toUpperCase(),
          duration,
          recordingUrl,
        },
      });
    }
  }

  /**
   * Get call analytics for admin dashboard
   */
  async getCallAnalytics(startDate: Date, endDate: Date) {
    const calls = await this.prisma.call.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalCalls = calls.length;
    const inbound = calls.filter(c => c.direction === 'INBOUND').length;
    const outbound = calls.filter(c => c.direction === 'OUTBOUND').length;
    const answered = calls.filter(c => c.status === 'COMPLETED').length;
    const missed = calls.filter(c => c.status === 'NO_ANSWER').length;
    const avgDuration = calls.reduce((sum, c) => sum + (c.duration || 0), 0) / totalCalls;

    return {
      totalCalls,
      inbound,
      outbound,
      answered,
      missed,
      answerRate: (answered / totalCalls * 100).toFixed(1),
      avgDuration: Math.round(avgDuration),
    };
  }

  /**
   * Bulk call leads (for campaigns)
   */
  async bulkCallLeads(leadIds: string[], agentId: string) {
    const results = [];

    for (const leadId of leadIds) {
      try {
        const call = await this.callLead(leadId, agentId);
        results.push({ leadId, success: true, callId: call.id });
        
        // Rate limit: 1 call per 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        results.push({ leadId, success: false, error: error.message });
      }
    }

    return results;
  }
}
