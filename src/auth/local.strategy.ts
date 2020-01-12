import { Strategy} from 'passport-jwt';
import { PassportStrategy} from '@nestjs/passport';
import { Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthService} from './auth.service';
import { UsersCreateDto } from '../users/users-create.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(usersCreateDto: UsersCreateDto, password: string): Promise<any> {
    const user = await this.authService.validateUser(usersCreateDto, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
