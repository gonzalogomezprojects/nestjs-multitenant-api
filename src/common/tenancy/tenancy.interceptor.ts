import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { TENANCY_ID } from './tenancy.constants';

@Injectable()
export class TenancyInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // El tenant ya fue resuelto por el TenantResolverMiddleware
    // y guardado en req.tenant
    const tenantId = request.tenant?.id;

    if (tenantId) {
      this.cls.set(TENANCY_ID, tenantId);
    }

    return next.handle();
  }
}
