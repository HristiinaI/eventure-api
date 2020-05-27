import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { IUser } from '../users/interfaces/user.interface';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async checkUserPassword(
    signedUser: IUser,
    password: string,
  ): Promise<Boolean> {
    if (signedUser.password !== password) {
      return false;
    }

    return true;
  }

  async sign( email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        'The specified user does not exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValid = await this.checkUserPassword(user, password);
    if (!isValid) {
      throw new HttpException(
        'The email/password combinaison is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokens = await this.jwtService.generateToken(user);

    return { tokens, user };
  }

  async refreshToken(token: string): Promise<any> {
    const user: IUser = await this.jwtService.verify(token);
    const tokens = await this.jwtService.generateToken(user);

    return { tokens, user };
  }
}
