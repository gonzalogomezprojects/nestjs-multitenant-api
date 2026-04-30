import { Module, Global } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { TenancyInterceptor } from './tenancy.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TenancyInterceptor,
    },
  ],
  exports: [ClsModule],
})
export class TenancyModule {}
