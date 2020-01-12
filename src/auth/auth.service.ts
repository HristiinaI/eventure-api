import { Injectable } from '@nestjs/common';
import { UsersService} from '../users/users.service';
import { IUser } from '../schemas/users.schemas';
import { UsersCreateDto } from '../users/users-create.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService<any>,
    private readonly jwtService: JwtService,
    ) {}

  async validateUser(usersCreateDto: UsersCreateDto, pass: string): Promise<IUser> {
   const user = await this.usersService.findOne(usersCreateDto);
   if (user && user.username === pass) {
     const { password, ...result } = user;
     return result;
   }
   return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
