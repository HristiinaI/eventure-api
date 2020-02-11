import { Injectable } from '@nestjs/common';
import { UsersService} from '../users/users.service';
import { IUser } from '../schemas/users.schemas';
import { UsersCreateDto } from '../users/users-create.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService<any>) {}

  async validateUser(usersCreateDto: UsersCreateDto, pass: string): Promise<IUser> {
    const user = await this.usersService.findOne(usersCreateDto);
    if (user && user.email === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
