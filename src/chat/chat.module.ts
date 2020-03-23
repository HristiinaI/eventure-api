import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatSchema } from './schemas/chat.schema';
import { UserSchema } from 'src/users/schemas/users.schemas';
import { UsersModule } from 'src/users/users.module';
import { OrganizationSchema } from 'src/organizations/schemas/organization.schema';
import { OrganizationsModule } from 'src/organizations/organizations.module';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Chat', schema: ChatSchema},
    {name: 'User', schema: UserSchema},
    {name: 'Organization', schema: OrganizationSchema}])],
    controllers: [ChatController],
    providers: [ChatService, UsersModule, OrganizationsModule],
    exports: [ChatService],
})
export class ChatModule {}
