import { EventsModule } from './events/events.module';

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsModule } from './organizations/organizations.module';
import { BoardModule } from './board/board.module';
import { CardsModule } from './cards/cards.module'; 

import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UsersModule,
    OrganizationsModule,
    EventsModule,
    BoardModule,
    CardsModule,
    MessageModule,
    ChatModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
