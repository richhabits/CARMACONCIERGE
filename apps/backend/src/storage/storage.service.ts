import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  constructor(private configService: ConfigService) {}

  getFileUrl(filename: string): string {
    const baseUrl = this.configService.get('BASE_URL') || 'http://localhost:3000';
    return `${baseUrl}/uploads/${filename}`;
  }

  async deleteFile(filename: string): Promise<void> {
    // Implement file deletion logic
    // For production, use cloud storage (S3, GCS, etc.)
  }
}
