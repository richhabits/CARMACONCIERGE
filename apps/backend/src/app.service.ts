import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      message: 'CARMACONCIERGE Backend API',
      timestamp: new Date().toISOString(),
    };
  }
}
