import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientsDto } from './dto/query-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        tenantId,
        ...dto,
      },
    });
  }

  async findAll(tenantId: string, query: QueryClientsDto) {
    const { search, page = 1, limit = 10 } = query;

    return this.prisma.client.findMany({
      where: {
        tenantId,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const client = await this.prisma.client.findFirst({
      where: { id, tenantId },
      include: {
        orders: true,
        tickets: true,
      },
    });

    if (!client) throw new NotFoundException('Client not found');

    return client;
  }

  async update(tenantId: string, id: string, dto: UpdateClientDto) {
    const exists = await this.prisma.client.findFirst({
      where: { id, tenantId },
    });

    if (!exists) throw new NotFoundException('Client not found');

    return this.prisma.client.update({
      where: { id },
      data: dto,
    });
  }
}
