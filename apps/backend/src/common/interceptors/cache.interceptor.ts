import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class HttpCacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    // Only cache GET requests
    if (method !== 'GET') {
      return next.handle();
    }

    // Generate cache key
    const cacheKey = `cache:${url}`;

    // Try to get from cache
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    // Continue and cache response
    return next.handle().pipe(
      tap((data) => {
        // Cache for 5 minutes by default
        this.cacheManager.set(cacheKey, data, 300000);
      }),
    );
  }
}
