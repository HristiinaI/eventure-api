import { EventsModule } from './events/events.module';

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsModule } from './organizations/organizations.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot(),
    OrganizationsModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
