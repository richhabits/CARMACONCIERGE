import { Controller, Get, Post, Body, Param, Query, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CallingService } from './calling.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@carmaconcierge/shared';

@ApiTags('calling')
@Controller('calling')
export class CallingController {
  constructor(private readonly callingService: CallingService) {}

  @Post('outbound/:leadId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Make outbound call to lead' })
  async callLead(@Param('leadId') leadId: string, @Body() body: { agentId: string }) {
    return this.callingService.callLead(leadId, body.agentId);
  }

  @Post('bulk-call')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Bulk call multiple leads' })
  async bulkCall(@Body() body: { leadIds: string[]; agentId: string }) {
    return this.callingService.bulkCallLeads(body.leadIds, body.agentId);
  }

  @Get('analytics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get call analytics' })
  async getAnalytics(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.callingService.getCallAnalytics(
      new Date(startDate),
      new Date(endDate),
    );
  }

  // Twilio webhook endpoints (no auth - verified by Twilio signature)
  
  @Post('webhook/inbound')
  async handleInbound(@Body() body: any, @Res() res: Response) {
    const { From, CallSid } = body;
    const { callRecord, user } = await this.callingService.handleInboundCall(From, CallSid);
    
    const twiml = this.callingService.getInboundCallScript(user);
    res.type('text/xml');
    res.send(twiml);
  }

  @Get('twiml/outbound/:callId')
  async getOutboundTwiml(@Param('callId') callId: string, @Res() res: Response) {
    const call = await this.prisma.call.findUnique({
      where: { id: callId },
      include: { lead: true },
    });
    
    const twiml = this.callingService.getOutboundCallScript(callId, call.lead);
    res.type('text/xml');
    res.send(twiml);
  }

  @Post('webhook/status')
  async handleStatus(@Body() body: any) {
    const { CallSid, CallStatus, CallDuration, RecordingUrl } = body;
    await this.callingService.updateCallStatus(
      CallSid,
      CallStatus,
      parseInt(CallDuration),
      RecordingUrl,
    );
  }
}
