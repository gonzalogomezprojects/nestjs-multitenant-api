import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlatformAuthController } from './platform-auth.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PlatformController, PlatformAuthController],
  providers: [PlatformService, PrismaService],
})
export class PlatformModule {}
