import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtPayload } from '../types/jwt-payload';

type AuthReq = Request & { user: JwtPayload };

@Injectable()
export class TenantMatchGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<AuthReq>();

    const hostTenantId = req.tenant?.id;
    const jwtTenantId = req.user?.tenantId;
    const role = req.user?.role;

    // Si no hay usuario, que lo maneje JwtAuthGuard
    if (!req.user) return true;

    // SUPER_ADMIN puede entrar en cualquier tenant
    if (role === 'SUPER_ADMIN') return true;

    // Usuario normal debe tener tenant en JWT
    if (!jwtTenantId) throw new ForbiddenException('User has no tenant');

    // Debe existir tenant resuelto por dominio
    if (!hostTenantId) throw new ForbiddenException('Tenant not resolved');

    if (hostTenantId !== jwtTenantId)
      throw new ForbiddenException('Tenant mismatch');

    return true;
  }
}
