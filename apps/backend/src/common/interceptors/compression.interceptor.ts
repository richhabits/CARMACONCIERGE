import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Response compression interceptor
 * Removes null/undefined fields and compresses responses
 */
@Injectable()
export class CompressionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.compress(data)),
    );
  }

  private compress(data: any): any {
    if (data === null || data === undefined) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.compress(item));
    }

    if (typeof data === 'object') {
      const compressed: any = {};
      for (const [key, value] of Object.entries(data)) {
        if (value !== null && value !== undefined) {
          compressed[key] = this.compress(value);
        }
      }
      return compressed;
    }

    return data;
  }
}
