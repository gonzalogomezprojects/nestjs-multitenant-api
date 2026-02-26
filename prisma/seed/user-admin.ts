/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '@prisma/client';
import * as argon2 from 'argon2';

function getDbUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is missing in env');
  return url;
}

function makePrisma() {
  const adapter = new PrismaPg({ connectionString: getDbUrl() });
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['warn', 'error'],
  });
}

async function main() {
  const prisma = makePrisma();

  try {
    console.log('🌱 Seeding SUPER_ADMIN...');

    const passwordHash = await argon2.hash(
      process.env.SEED_ROOT_PASSWORD ?? 'Root123!',
    );

    const superAdmin = await prisma.user.upsert({
      where: {
        email: process.env.SEED_ROOT_EMAIL ?? 'root@platform.com',
      },
      update: {
        passwordHash,
        role: Role.SUPER_ADMIN,
        tenantId: null,
        isActive: true,
      },
      create: {
        email: process.env.SEED_ROOT_EMAIL ?? 'root@platform.com',
        passwordHash,
        role: Role.SUPER_ADMIN,
        tenantId: null,
        isActive: true,
      },
    });

    console.log('✅ SUPER_ADMIN listo');
    console.log('📧 Email:', superAdmin.email);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
