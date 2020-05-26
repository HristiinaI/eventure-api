import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatSchema } from './schemas/chat.schema';
import { UserSchema } from 'src/users/schemas/users.schemas';
import { UsersModule } from 'src/users/users.module';
import { OrganizationSchema } from 'src/organizations/schemas/organization.schema';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '../auth/jwt/jwt.service';
import { MessageService } from '../message/message.service';
import { MessageSchema } from '../message/schemas/message.schema';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Message', schema: MessageSchema},
        {name: 'User', schema: UserSchema},
        {name: 'Organization', schema: OrganizationSchema},
        {name: 'Chat', schema: ChatSchema},
    ]), UsersModule],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway, UsersModule, OrganizationsModule, JwtService, MessageService],
    exports: [ChatService, JwtService],
})
export class ChatModule {}
