import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { UserSchema } from 'src/users/schemas/users.schemas';
import { OrganizationSchema } from 'src/organizations/schemas/organization.schema';
import { ChatModule } from 'src/chat/chat.module';
import { ChatSchema } from 'src/chat/schemas/chat.schema';
import { ChatService } from 'src/chat/chat.service';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Message', schema: MessageSchema}, 
        {name: 'User', schema: UserSchema},
        {name: 'Organization', schema: OrganizationSchema},
        {name: 'Chat', schema: ChatSchema}
      ])],
    controllers: [MessageController],
    providers: [MessageService, ChatService, UsersModule, OrganizationsModule, ChatModule],
    exports: [MessageService, ChatService],
})
export class MessageModule {}
