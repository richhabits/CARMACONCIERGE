import { Injectable } from '@nestjs/common';
import { AiService } from '../ai.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FaqService {
  private readonly faqs = [
    {
      question: 'How do I add a vehicle?',
      answer: 'You can add a vehicle by going to the Vehicles tab and clicking "Add Vehicle". You can also type in your registration number and we\'ll automatically pull the details.',
      category: 'vehicles',
    },
    {
      question: 'How do I book an MOT?',
      answer: 'Go to Jobs > Create Job > Select MOT. Choose your vehicle, date, and location. We\'ll find nearby MOT centers and send you quotes.',
      category: 'booking',
    },
    {
      question: 'How much does an MOT cost?',
      answer: 'MOT tests cost a maximum of £54.85 for cars. We\'ll show you quotes from local garages so you can compare prices.',
      category: 'pricing',
    },
    {
      question: 'How do I check my vehicle tax status?',
      answer: 'Enter your registration number in the vehicle lookup, and we\'ll show you the tax status, expiry date, and MOT history.',
      category: 'uk-compliance',
    },
    {
      question: 'What happens after I accept a quote?',
      answer: 'Once you accept a quote, the job is confirmed. The supplier will contact you to arrange the service date and time.',
      category: 'quotes',
    },
    {
      question: 'Can I track my job status?',
      answer: 'Yes! Go to the Jobs tab to see all your jobs and their current status: Pending, In Progress, or Completed.',
      category: 'jobs',
    },
    {
      question: 'How do I pay for a service?',
      answer: 'You can pay directly through the app using card, Apple Pay, or Google Pay. Payment is processed securely.',
      category: 'payments',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we comply with UK GDPR and data protection laws. All your personal and vehicle data is encrypted and secure.',
      category: 'privacy',
    },
  ];

  constructor(
    private aiService: AiService,
    private prisma: PrismaService,
  ) {}

  /**
   * Search FAQs using AI-powered semantic search
   */
  async searchFaqs(query: string): Promise<any[]> {
    // Use AI to find relevant FAQs
    const prompt = `Given this question: "${query}"

Here are available FAQs:
${this.faqs.map((faq, i) => `${i + 1}. Q: ${faq.question}\n   A: ${faq.answer}`).join('\n\n')}

Return the numbers (comma-separated) of the 3 most relevant FAQs. Just return numbers, nothing else.`;

    try {
      const result = await this.aiService.generateText(prompt);
      const indices = result
        .trim()
        .split(/[,\s]+/)
        .map((n: string) => parseInt(n) - 1)
        .filter((n: number) => !isNaN(n) && n >= 0 && n < this.faqs.length)
        .slice(0, 3);

      return indices.map((i: number) => this.faqs[i]);
    } catch (error) {
      // Fallback to keyword matching
      const lowerQuery = query.toLowerCase();
      return this.faqs
        .filter((faq) => {
          const text = `${faq.question} ${faq.answer}`.toLowerCase();
          return lowerQuery.split(' ').some((word) => text.includes(word));
        })
        .slice(0, 5);
    }
  }

  async getAllFaqs(category?: string) {
    if (category) {
      return this.faqs.filter((faq) => faq.category === category);
    }
    return this.faqs;
  }

  async getCategories() {
    return [...new Set(this.faqs.map((faq) => faq.category))];
  }

  /**
   * Generate FAQ answer using AI if not found
   */
  async generateAnswer(question: string): Promise<string> {
    const context = `You are a helpful assistant for CARMACONCIERGE, a UK vehicle management platform.
Common topics: vehicle registration, MOT, tax, insurance, bookings, quotes, payments.`;

    return this.aiService.generateText(`Question: ${question}\n\nAnswer:`, context);
  }
}
