import { Injectable } from '@nestjs/common';
import { UsersService} from '../users/users.service';
import { IUser } from '../schemas/users.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { UsersCreateDto } from '../users/users-create.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel) {}

  async validateUser(usersCreateDto: UsersCreateDto, pass: string): Promise<IUser>{
   const user = await this.userModel.findOne(usersCreateDto);
   if (user && user.username === pass) {
     const { password, ...result } = user;
     return result;
   }
   return null;
  }
}
