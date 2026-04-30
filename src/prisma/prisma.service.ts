import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { tenancyExtension } from './extensions/tenancy.extension';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private _extendedClient: any;

  constructor(private readonly config: ConfigService) {
    const connectionString =
      config.get<string>('DATABASE_URL') ?? process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL is missing');
    }

    const adapter = new PrismaPg({ connectionString });

    super({
      adapter,
      log:
        (config.get<string>('app.env') ?? 'development') === 'production'
          ? ['error', 'warn']
          : ['query', 'info', 'warn', 'error'],
    });

    // Inicializamos la extensión
    this._extendedClient = this.$extends(tenancyExtension);

    // Retornamos un Proxy para que todas las llamadas a modelos usen la extensión
    return new Proxy(this, {
      get: (target, prop) => {
        // Si la propiedad existe en el cliente extendido (ej: un modelo), la usamos
        if (prop in this._extendedClient) {
          return this._extendedClient[prop];
        }
        // Si no, usamos el target original (PrismaClient)
        return target[prop];
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
