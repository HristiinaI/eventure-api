import { InjectModel} from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IChat } from './interfaces/chat.interface';
import { ChatDto } from './dto/chat.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { IOrganization } from 'src/organizations/interfaces/organization.interface';
import { MessageDto } from '../message/dto/message.dto';
import { IMessage } from '../message/interfaces/message.interface';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<IChat>,
              @InjectModel('User') private readonly userModel: Model<IUser>,
              @InjectModel('Organization')
  private readonly organizationModel: Model<IOrganization>) {}

  async findAll(): Promise<IChat[]> {
    try {
      return await this.chatModel.find().exec();
    } catch (Exception) {
      return null;
    }
  }

  async findById(id: string): Promise<IChat> {
    try {
      return await this.chatModel.findById(id).exec();
    } catch (Exception) {
      return null;
    }
  }

  async findByName(name: string): Promise<IChat> {
    try {
      return await this.chatModel.findOne({name}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async getMessages(id: string, limit: number) {
    let chat = await this.chatModel.findWithLimit(id, limit).exec();

    // Create the user room, if isn't already exist
    if (!chat) {
      const userChat = new this.chatModel({ _id: id, name: id, is_user: true });
      chat = await this.create(userChat);
    }

    return chat.messages;
  }

  async findAllMessages(id: string): Promise<IMessage[]> {
    const chat = await this.chatModel.findById(id).exec();
    /*const messages = [];
    for (let i = 0; i < chat.messages.length; i++) {
      messages.push(chat.messages[i].message);
    }*/

    return chat.messages;
  }

  async create(chatDto: ChatDto): Promise<IChat> {
    const chat = new this.chatModel(chatDto);
    for (let i = 0; i < chatDto.members.length; i++) {
      let user = null;
      if (chatDto.members[i].includes('@')) {
        user = await this.userModel.
        findOne({email: chatDto.members[i]}).exec();
        await user.chats.push(chat._id);
        await this.userModel.
        findByIdAndUpdate(user._id, {chats: user.chats}, {new: true}).exec();
        chat.members[i] = user.email;
      } else {
        user = await this.organizationModel.
        findOne({name: chatDto.members[i]}).exec();
        await user.chats.push(chat._id);
        await this.organizationModel.
        findByIdAndUpdate(user._id, {chats: user.chats}, {new: true}).exec();
        chat.members[i] = user.name;
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

  async updateMessages(id: string, messageDto: MessageDto): Promise<IChat> {
    const chat = await this.chatModel.findById(id);
    await chat.messages.push(messageDto);
    try {
      return await this.chatModel.findByIdAndUpdate(id, {messages: chat.messages}, {new: true}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async delete(id: string): Promise<IChat> {
    return await this.chatModel.findByIdAndDelete(id).exec();
  }
}
