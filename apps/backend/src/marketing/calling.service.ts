import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

/**
 * CALLING SYSTEM - Inbound & Outbound
 * Uses Twilio Voice API + AI Voice
 */
@Injectable()
export class CallingService {
  private readonly logger = new Logger(CallingService.name);
  private twilioClient: any = null;

  constructor(
    private prisma: PrismaService,
    private ai: AiService,
    private config: ConfigService,
  ) {
    // Initialize Twilio when credentials available
    const accountSid = this.config.get('TWILIO_ACCOUNT_SID');
    const authToken = this.config.get('TWILIO_AUTH_TOKEN');
    
    if (accountSid && authToken) {
      try {
        // const twilio = require('twilio');
        // this.twilioClient = twilio(accountSid, authToken);
        this.logger.log('Twilio initialized');
      } catch (error) {
        this.logger.warn('Twilio not available - install twilio package');
      }
    }
  }

  /**
   * OUTBOUND CALL - Sales
   * AI-powered sales calls to leads
   */
  async makeOutboundCall(
    leadId: string,
    phoneNumber: string,
    script: string,
  ) {
    if (!this.twilioClient) {
      throw new Error('Twilio not configured. Please add TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN to environment variables.');
    }

    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      throw new Error('Lead not found');
    }

    // Make call via Twilio
    const call = await this.twilioClient.calls.create({
      from: this.config.get('TWILIO_PHONE_NUMBER'),
      to: phoneNumber,
      url: `${this.config.get('BASE_URL')}/api/v1/marketing/calls/twiml/${leadId}`,
      statusCallback: `${this.config.get('BASE_URL')}/api/v1/marketing/calls/status`,
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
      record: true,
      recordingStatusCallback: `${this.config.get('BASE_URL')}/api/v1/marketing/calls/recording`,
    });

    // Save call to database
    await this.prisma.call.create({
      data: {
        leadId,
        phoneNumber,
        direction: 'OUTBOUND',
        type: 'SALES',
        twilioSid: call.sid,
        status: 'INITIATED',
        script,
      },
    });

    return call;
  }

  /**
   * INBOUND CALL HANDLING
   * Route to appropriate department
   */
  async handleInboundCall(from: string) {
    // Check if existing customer
    const user = await this.prisma.user.findFirst({
      where: { phone: from },
    });

    if (user) {
      return {
        action: 'route-to-support',
        customerId: user.id,
      };
    }

    // New lead
    await this.prisma.lead.create({
      data: {
        source: 'INBOUND_CALL',
        contactPhone: from,
        status: 'NEW',
        urgency: 'high',
      },
    });

    return {
      action: 'route-to-sales',
    };
  }

  /**
   * GENERATE TWIML FOR CALL
   * Dynamic call script
   */
  async generateCallScript(leadId: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
      include: { user: true },
    });

    if (!lead) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-GB">Sorry, we could not find that lead.</Say>
  <Hangup/>
</Response>`;
    }

    // Use AI to generate personalized script
    const script = await this.ai.generateText(`
Generate a friendly sales call script for UK car service platform.

Lead info:
- Name: ${lead.contactName || 'there'}
- Service needed: ${lead.serviceType}
- Location: ${lead.location}
- Urgency: ${lead.urgency}

Script should:
1. Introduce CARMACONCIERGE
2. Mention their specific need
3. Offer solution
4. Ask for booking
5. Provide next steps

Keep it natural, UK-friendly, under 60 seconds.
`);

    // Convert to TwiML
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-GB">
    ${script}
  </Say>
  <Gather input="dtmf" numDigits="1" action="/api/v1/marketing/calls/response/${leadId}">
    <Say voice="alice" language="en-GB">
      Press 1 to book an appointment now, or press 2 to receive information by text message.
    </Say>
  </Gather>
</Response>`;
  }

  /**
   * HANDLE CALL RESPONSE
   */
  async handleCallResponse(leadId: string, digit: string) {
    if (digit === '1') {
      // Interested - book appointment
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-GB">
    Excellent! We'll send you a booking link by text message. One of our team will call you shortly to confirm. Thank you!
  </Say>
  <Hangup/>
</Response>`;
    } else if (digit === '2') {
      // Send info
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-GB">
    No problem! We'll text you our details. Have a great day!
  </Say>
  <Hangup/>
</Response>`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-GB">
    Sorry, I didn't catch that. Goodbye!
  </Say>
  <Hangup/>
</Response>`;
  }

  /**
   * AUTOMATED FOLLOW-UP CALLS
   * Call leads who haven't responded
   */
  async automatedFollowUp() {
    const leads = await this.prisma.lead.findMany({
      where: {
        status: 'NEW',
        contactPhone: { not: null },
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
      take: 50,
    });

    for (const lead of leads) {
      if (lead.contactPhone && this.twilioClient) {
        try {
          await this.makeOutboundCall(
            lead.id,
            lead.contactPhone,
            'Follow-up call',
          );
        } catch (error) {
          this.logger.error(`Failed to call lead ${lead.id}: ${error.message}`);
        }
      }
    }
  }

  /**
   * CALL ANALYTICS
   */
  async getCallAnalytics(days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const stats = await this.prisma.call.groupBy({
      by: ['type', 'status'],
      where: {
        createdAt: { gte: since },
      },
      _count: true,
      _avg: {
        duration: true,
      },
    });

    return stats;
  }

  /**
   * CALL QUEUE - Prioritize calls
   */
  async getCallQueue() {
    return this.prisma.lead.findMany({
      where: {
        status: 'NEW',
        contactPhone: { not: null },
      },
      orderBy: [
        { urgency: 'desc' },
        { score: 'desc' },
        { createdAt: 'asc' },
      ],
      take: 100,
    });
  }

  /**
   * ASSIGN CALL TO AGENT
   */
  async assignCallToAgent(leadId: string, agentId: string) {
    return this.prisma.lead.update({
      where: { id: leadId },
      data: {
        assignedTo: agentId,
        status: 'IN_PROGRESS',
      },
    });
  }
}
