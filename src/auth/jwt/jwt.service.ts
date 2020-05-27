import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as os from 'os';

import { APP_CONFIG } from '../../config';
import { IUser } from '../../users/interfaces/user.interface';
import { UsersService } from '../../users/users.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtService {
  constructor(private readonly usersService: UsersService) {}

  async generateToken(user: IUser): Promise<any> {
    const payload = {
      sub: {
        _id: user._id,
        email: user.email,
      },
      iss: os.hostname(),
    };
    const accessToken = await jwt.sign(payload, APP_CONFIG.jwtSecret, {
      expiresIn: APP_CONFIG.accessTokenExpires,
    });
    const refreshToken = await jwt.sign(payload, APP_CONFIG.jwtSecret, {
      expiresIn: APP_CONFIG.refreshTokenExpires,
    });

    return { accessToken, refreshToken };
  }

  async verify(token: string, isWs: boolean = false): Promise<IUser | null> {
      const payload = jwt.verify(token, APP_CONFIG.jwtSecret) as any;
      const user = await this.usersService.findById(payload.sub._id);
      return user;
  }
}
