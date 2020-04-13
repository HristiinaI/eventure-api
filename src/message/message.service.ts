import { InjectModel} from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMessage } from './interfaces/message.interface';
import { MessageDto } from './dto/message.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { IOrganization } from 'src/organizations/interfaces/organization.interface';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private readonly messageModel: Model<IMessage>,
  @InjectModel('User') private readonly userModel: Model<IUser>,
  @InjectModel('Organization') private readonly organizationModel: Model<IOrganization>) 
  {}
  
  async findAll(): Promise<IMessage[]> {
      try {
        return await this.messageModel.find().exec();
      } catch (Exception) {
          return null;
      }
  }

  async findAllPerChatId(chatId: string): Promise<IMessage[]> {
    try {
      return await this.messageModel.find({chatId: chatId}).exec();
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
    try{
      return await this.messageModel.findOne({sender: sender}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async create(messageDto: MessageDto): Promise<IMessage> {
    var message = new this.messageModel(messageDto);
    if(await this.isOrg(messageDto) != null) {
        messageDto.isUser = false;
    } else if(await this.isUser(messageDto) != null) {
        messageDto.isUser = true;
    }
    return await message.save();
  }

  async isUser(messageDto: MessageDto): Promise<IUser> {
      try {
        return await this.userModel.findOne({email: messageDto.sender}).exec();
      } catch(Exception) {
          return null;
      }
  }
    
  async isOrg(messageDto: MessageDto): Promise<IOrganization> {
    try {
      return await this.organizationModel.findOne({name: messageDto.sender}).exec();
    } catch(Exception) {
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
