import { InjectModel} from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IChat } from './interfaces/chat.interface';
import { ChatDto } from './dto/chat.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { IOrganization } from 'src/organizations/interfaces/organization.interface';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<IChat>,
  @InjectModel('User') private readonly userModel: Model<IUser>,
  @InjectModel('Organization') private readonly organizationModel: Model<IOrganization>) 
  {}

  async findAll(): Promise<IChat[]> {
    return await this.chatModel.find().exec();
  }

  async findById(id: string): Promise<IChat> {
    try {
      return await this.chatModel.findById(id).exec();
    } catch (Exception) {
      return null;
    }
  }

  async findByName(name: string): Promise<IChat> {
    try{
      return await this.chatModel.findOne({name: name}).exec();
    } catch (Exception) {
      return null;
    } 
  }

  async create(chatDto: ChatDto): Promise<IChat> {
    const chat = new this.chatModel(chatDto); 
    for(let i = 0; i < chatDto.members.length; i++) {
      var user = null;
      if(chatDto.members[i].includes('@')) {
        user = await this.userModel.findOne({email: chatDto.members[i]}).exec();
        await user.chats.push(chat._id);
        await this.userModel.findByIdAndUpdate(user._id, {chats: user.chats}, {new: true}).exec();
        chat.members[i] = user._id;
      } else {
        user = await this.organizationModel.findOne({name: chatDto.members[i]}).exec();
        await user.chats.push(chat._id);
        await this.organizationModel.findByIdAndUpdate(user._id, {chats: user.chats}, {new: true}).exec();
        chat.members[i] = user._id;
      }
    }
    return await chat.save();
  }

  async update(id: string, chatDto: ChatDto): Promise<IChat> {
    try {
      return await this.chatModel.findByIdAndUpdate(id, chatDto, {new: true}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async updateMessages(id: string, message: string): Promise<IChat> {
    var chat = await this.chatModel.findById(id);
    await chat.messages.push(message);
    try{
      return await this.chatModel.findByIdAndUpdate(id, {messages: chat.messages}, {new: true}).exec();
    } catch(Exception) {
      return null;
    }
  }

  async delete(id: string): Promise<IChat> {
    return await this.chatModel.findByIdAndDelete(id).exec();
  }
}