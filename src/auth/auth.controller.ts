import { Controller, Post, HttpStatus, Request, HttpException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Request() req): Promise<any> {
    const body = req.body;

    if (!body) { 
      throw new HttpException('Body is missing',
       HttpStatus.BAD_REQUEST); }
    if (!body.email || !body.password) { 
      throw new HttpException('Missing email or password',
       HttpStatus.BAD_REQUEST); }

    return await this.authService.sign(body.email, body.password);
  }

  @Post('/refresh-token')
  async refreshToken(@Request() req): Promise<any> {
    const body = req.body;

    return await this.authService.refreshToken(body.refreshToken);
  }
}
