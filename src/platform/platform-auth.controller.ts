import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Controller('platform/auth')
export class PlatformAuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  private cookieName() {
    return this.config.get<string>('AUTH_REFRESH_COOKIE_NAME') ?? 'rt';
  }

  private setRefreshCookie(res: Response, token: string) {
    res.cookie(this.cookieName(), token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/api/v1/platform/auth/refresh',
    });
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true })
    res: Response,
  ) {
    const { accessToken, refreshToken } = await this.auth.loginPlatform(dto);

    this.setRefreshCookie(res, refreshToken);

    return { accessToken };
  }
}
