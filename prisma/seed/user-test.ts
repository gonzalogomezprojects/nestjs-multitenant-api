/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import * as argon2 from 'argon2';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

function getDbUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is missing in env');
  return url;
}

function makePrisma() {
  const adapter = new PrismaPg({ connectionString: getDbUrl() });
  return new PrismaClient({ adapter });
}

async function seedSuperAdmin(
  prisma: PrismaClient,
  params: { email: string; passwordPlain: string },
) {
  const passwordHash = await argon2.hash(params.passwordPlain);

  return prisma.user.upsert({
    where: {
      email: params.email, // ⚠ requiere email @unique en schema
    },
    update: {
      passwordHash,
      role: Role.SUPER_ADMIN,
      tenantId: null,
      isActive: true,
    },
    create: {
      email: params.email,
      passwordHash,
      role: Role.SUPER_ADMIN,
      tenantId: null,
      isActive: true,
    },
  });
}

async function main() {
  const prisma = makePrisma();

  try {
    console.log('🌱 Seeding SUPER_ADMIN...');

    const superAdmin = await seedSuperAdmin(prisma, {
      email: process.env.SEED_ROOT_EMAIL ?? 'root@platform.com',
      passwordPlain: process.env.SEED_ROOT_PASSWORD ?? 'Root123!',
    });

    console.log('✅ SUPER_ADMIN ready');
    console.log('🔑 Credentials:');
    console.log('   root@platform.com / Root123!');
    console.log('🆔 User ID:', superAdmin.id);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
