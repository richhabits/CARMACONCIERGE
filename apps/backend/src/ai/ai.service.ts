import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Multi-model AI service using free/open-source models
 * Automatically routes requests to fastest/cheapest available model
 */
@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private models = ['ollama', 'huggingface', 'openrouter-free'];
  private currentModel = 0;

  constructor(private configService: ConfigService) {}

  /**
   * Get best available free AI model
   * Priority: Ollama (local) > HuggingFace > OpenRouter (free tier)
   */
  async getAvailableModel(): Promise<string> {
    // Check Ollama first (local, fastest, free)
    if (await this.checkOllama()) {
      return 'ollama';
    }

    // Fallback to HuggingFace Inference API (free tier)
    if (await this.checkHuggingFace()) {
      return 'huggingface';
    }

    // Last resort: OpenRouter free models
    return 'openrouter-free';
  }

  /**
   * Generate text using cheapest/fastest available model
   */
  async generateText(prompt: string, context?: string): Promise<string> {
    const model = await this.getAvailableModel();
    this.logger.log(`Using AI model: ${model}`);

    switch (model) {
      case 'ollama':
        return this.generateWithOllama(prompt, context);
      case 'huggingface':
        return this.generateWithHuggingFace(prompt, context);
      default:
        return this.generateWithOpenRouter(prompt, context);
    }
  }

  /**
   * Ollama - Local, free, fastest
   */
  private async checkOllama(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        signal: AbortSignal.timeout(1000), // 1s timeout
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async generateWithOllama(prompt: string, context?: string): Promise<string> {
    const ollamaUrl = this.configService.get('OLLAMA_URL') || 'http://localhost:11434';
    const model = this.configService.get('OLLAMA_MODEL') || 'llama3.1:8b';

    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt: context ? `${context}\n\n${prompt}` : prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || '';
  }

  /**
   * HuggingFace Inference API - Free tier
   */
  private async checkHuggingFace(): Promise<boolean> {
    // HuggingFace is always available (with rate limits)
    return true;
  }

  private async generateWithHuggingFace(prompt: string, context?: string): Promise<string> {
    const model = 'microsoft/DialoGPT-medium'; // Free, fast model
    const apiUrl = `https://api-inference.huggingface.co/models/${model}`;
    const token = this.configService.get('HUGGINGFACE_TOKEN'); // Optional

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inputs: context ? `${context}\n\n${prompt}` : prompt,
        parameters: {
          max_length: 200,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) && data[0]?.generated_text
      ? data[0].generated_text
      : JSON.stringify(data);
  }

  /**
   * OpenRouter free models fallback
   */
  private async generateWithOpenRouter(prompt: string, context?: string): Promise<string> {
    const apiKey = this.configService.get('OPENROUTER_API_KEY');
    if (!apiKey) {
      throw new Error('No AI models available. Please configure Ollama or HuggingFace.');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          { role: 'system', content: context || 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  /**
   * Batch process multiple requests efficiently
   */
  async batchGenerate(prompts: string[]): Promise<string[]> {
    const model = await this.getAvailableModel();
    // Process in parallel for speed
    return Promise.all(prompts.map((p) => this.generateText(p)));
  }
}
