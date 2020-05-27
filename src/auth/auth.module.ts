import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [JwtService],
})
export class AuthModule {}
