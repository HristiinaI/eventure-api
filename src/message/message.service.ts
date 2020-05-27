import { InjectModel} from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMessage } from './interfaces/message.interface';
import { MessageDto } from './dto/message.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { IOrganization } from 'src/organizations/interfaces/organization.interface';
import { Socket } from 'socket.io';
import { ChatGateway } from '../chat/chat.gateway';
import { JwtService } from '../auth/jwt/jwt.service';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private readonly messageModel: Model<IMessage>,
              @InjectModel('User') private readonly userModel: Model<IUser>,
              @InjectModel('Organization') private readonly organizationModel: Model<IOrganization>,
              private jwtService: JwtService, private chatService: ChatService) {}

  chatGateway: ChatGateway = new ChatGateway(this.jwtService, this.chatService, this);
  socket: Socket;
  async findAll(): Promise<IMessage[]> {
      try {
        return await this.messageModel.find().exec();
      } catch (Exception) {
          return null;
      }
  }

  async findAllPerChatId(chatId: string): Promise<IMessage[]> {
    try {
      return await this.messageModel.find({chatId}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async findById(id: string): Promise<IMessage> {
    try {
      return await this.messageModel.findById(id).exec();
    } catch (Exception) {
      return null;
    }
  }

  async findBySender(sender: string): Promise<IMessage> {
    try {
      return await this.messageModel.findOne({sender}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async create(messageDto: MessageDto): Promise<IMessage> {
    const message = new this.messageModel(messageDto);
    if (await this.isOrg(messageDto) != null) {
        messageDto.isUser = false;
    } else if (await this.isUser(messageDto) != null) {
        messageDto.isUser = true;
    }
    // this.chatGateway.handleConnection(this.socket);
    // this.chatGateway.onMessage(this.socket, messageDto);
    // this.chatGateway.handleDisconnect(this.socket);
    return message.save();
  }

  async isUser(messageDto: MessageDto): Promise<IUser> {
      try {
        return await this.userModel.findOne({email: messageDto.sender}).exec();
      } catch (Exception) {
          return null;
      }
  }

  async isOrg(messageDto: MessageDto): Promise<IOrganization> {
    try {
      return await this.organizationModel.findOne({name: messageDto.sender}).exec();
    } catch (Exception) {
        return null;
    }
  }

  async update(id: string, messageDto: MessageDto): Promise<IMessage> {
    try {
      return await this.messageModel.findByIdAndUpdate(id, messageDto, {new: true}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async delete(id: string): Promise<IMessage> {
    return await this.messageModel.findByIdAndDelete(id).exec();
  }
}
