import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from './users/users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from "./users/users/users.controller";
import { UsersService } from "./users/users/users.service";

@Module({
  imports: [
    UsersModule, 
    MongooseModule.forRoot('mongodb://localhost/nest')
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
