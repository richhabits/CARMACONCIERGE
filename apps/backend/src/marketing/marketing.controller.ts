import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { MarketingService } from './marketing.service';
import { SocialMediaService } from './social-media.service';
import { CallingService } from './calling.service';
import { UserRole } from '@carmaconcierge/shared';

@ApiTags('marketing')
@Controller('marketing')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class MarketingController {
  constructor(
    private marketingService: MarketingService,
    private socialMedia: SocialMediaService,
    private calling: CallingService,
  ) {}

  // ========== SOCIAL MEDIA ==========

  @Post('social/post')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Post to social media' })
  async postToSocial(@Body() body: { platform: string; content: string; imageUrl?: string }) {
    if (body.platform === 'FACEBOOK') {
      return this.socialMedia.postToFacebook(body.content, body.imageUrl);
    } else if (body.platform === 'TWITTER') {
      return this.socialMedia.postToTwitter(body.content);
    }
    return { success: false };
  }

  @Post('social/generate')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Generate AI content for social media' })
  async generateContent(@Body() body: { theme: string; platform: string }) {
    return this.socialMedia.generateContent(body.theme, body.platform);
  }

  @Get('social/analytics')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get social media analytics' })
  async getSocialAnalytics(@Query('days') days?: string) {
    return this.socialMedia.getAnalytics(days ? parseInt(days) : 30);
  }

  @Post('social/schedule')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Schedule social media post' })
  async schedulePost(
    @Body() body: { platform: string; content: string; scheduledFor: string },
  ) {
    return this.socialMedia.schedulePost(
      body.platform,
      body.content,
      new Date(body.scheduledFor),
    );
  }

  // ========== CALLING SYSTEM ==========

  @Post('calls/outbound')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Make outbound sales call' })
  async makeCall(@Body() body: { leadId: string; phoneNumber: string; script: string }) {
    return this.calling.makeOutboundCall(body.leadId, body.phoneNumber, body.script);
  }

  @Get('calls/queue')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get call queue' })
  async getCallQueue() {
    return this.calling.getCallQueue();
  }

  @Get('calls/analytics')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get call analytics' })
  async getCallAnalytics(@Query('days') days?: string) {
    return this.calling.getCallAnalytics(days ? parseInt(days) : 30);
  }

  @Post('calls/assign')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Assign call to agent' })
  async assignCall(@Body() body: { leadId: string; agentId: string }) {
    return this.calling.assignCallToAgent(body.leadId, body.agentId);
  }

  // ========== TWIML ENDPOINTS (No Auth) ==========

  @Get('calls/twiml/:leadId')
  @ApiOperation({ summary: 'Generate TwiML for call' })
  async getTwiML(@Param('leadId') leadId: string) {
    const twiml = await this.calling.generateCallScript(leadId);
    return twiml;
  }

  @Post('calls/response/:leadId')
  @ApiOperation({ summary: 'Handle call response' })
  async handleResponse(@Param('leadId') leadId: string, @Body() body: any) {
    return this.calling.handleCallResponse(leadId, body.Digits);
  }

  @Post('calls/status')
  @ApiOperation({ summary: 'Call status webhook' })
  async callStatus(@Body() body: any) {
    // Update call status in database
    return { success: true };
  }
}
