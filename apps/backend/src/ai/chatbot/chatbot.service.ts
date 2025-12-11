import { Injectable } from '@nestjs/common';
import { AiService } from '../ai.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ChatbotService {
  constructor(
    private aiService: AiService,
    private prisma: PrismaService,
  ) {}

  private readonly systemPrompt = `You are a helpful customer service agent for CARMACONCIERGE, a UK vehicle management platform.
You help users with:
- Vehicle registration lookups
- MOT, tax, and insurance checks
- Booking services (MOT, servicing, repairs)
- Quotes and pricing
- General questions about the platform

Be friendly, concise, and helpful. Always ask for vehicle registration if relevant.`;

  async handleMessage(userId: string, message: string, conversationId?: string): Promise<{
    response: string;
    conversationId: string;
    suggestions?: string[];
  }> {
    // Get conversation history
    const history = conversationId
      ? await this.getConversationHistory(conversationId)
      : [];

    // Build context from history
    const context = history
      .slice(-5) // Last 5 messages
      .map((m: any) => `${m.sender}: ${m.content}`)
      .join('\n');

    // Generate response using AI
    const response = await this.aiService.generateText(
      `User: ${message}\n\nAssistant:`,
      `${this.systemPrompt}\n\nConversation history:\n${context}`,
    );

    // Save conversation
    const convId = conversationId || (await this.createConversation(userId)).id;
    await this.saveMessage(convId, userId, message, 'user');
    await this.saveMessage(convId, 'ai', response, 'assistant');

    // Generate suggestions
    const suggestions = await this.generateSuggestions(message);

    return {
      response,
      conversationId: convId,
      suggestions,
    };
  }

  private async getConversationHistory(conversationId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 10,
        },
      },
    });
    return conversation?.messages || [];
  }

  private async createConversation(userId: string) {
    return this.prisma.conversation.create({
      data: {
        participants: {
          create: [{ userId }],
        },
      },
    });
  }

  private async saveMessage(
    conversationId: string,
    senderId: string,
    content: string,
    type: 'user' | 'assistant',
  ) {
    return this.prisma.message.create({
      data: {
        conversationId,
        senderId: type === 'assistant' ? 'ai-system' : senderId,
        type: 'TEXT',
        content,
      },
    });
  }

  private async generateSuggestions(userMessage: string): Promise<string[]> {
    const lower = userMessage.toLowerCase();
    
    if (lower.includes('mot') || lower.includes('test')) {
      return ['Book MOT', 'Check MOT history', 'MOT reminders'];
    }
    if (lower.includes('tax') || lower.includes('road tax')) {
      return ['Check tax status', 'Tax due dates', 'Tax reminders'];
    }
    if (lower.includes('quote') || lower.includes('price')) {
      return ['Get quote', 'Compare prices', 'Quote history'];
    }
    if (lower.includes('vehicle') || lower.includes('car')) {
      return ['Add vehicle', 'View vehicles', 'Vehicle details'];
    }

    return ['Book service', 'View jobs', 'Contact support'];
  }
}
