import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlatformService {
  constructor(private prisma: PrismaService) {}

  async getOverview() {
    const [tenants, users, orders] = await Promise.all([
      this.prisma.tenant.count(),
      this.prisma.user.count(),
      this.prisma.order.count(),
    ]);

    return { tenants, users, orders };
  }

  async getAllTenants() {
    return this.prisma.tenant.findMany({
      include: {
        users: true,
      },
    });
  }
}
