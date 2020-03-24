import { EventsModule } from './events/events.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsModule } from './organizations/organizations.module';
import { BoardModule } from './board/board.module';
import { ListsModule } from './list/lists.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    BoardModule,
    ListsModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot(),
    OrganizationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
