import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {IEvent} from '../schemas/event.shema';
import {Model} from 'mongoose';
import { EventCreateDto } from './dto/event-create.dto';
import { UsersCreateDto } from '../users/users-create.dto';
import { IUser } from '../schemas/users.schemas';

@Injectable()
export class EventsService {
  constructor(@InjectModel('Event') private readonly eventModel: Model<IEvent>) {}

  async create(eventCreateDto: EventCreateDto): Promise<IEvent> {
    const createdEvent = new this.eventModel(eventCreateDto);
    return createdEvent.save();
  }

  async findAll(): Promise<IEvent[]> {
    return await this.eventModel.find().exec();
  }

  async findEventById(id: string): Promise<IEvent> {
    return await this.eventModel.findById(id).exec();
  }

  async findByParam(params: object): Promise<IEvent> {
    const result = await this.eventModel.findOne(params).exec();  
    return result;
  }

  async findByName(name: string): Promise<IEvent> {
    try {
      return await this.eventModel.find({ name: new RegExp(name, "i")}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async findByCreator(creator: string): Promise<IEvent> {
    try {
      return await this.eventModel.find({ creator }).exec();
    } catch (Exception) {
      return null;
    }
  }

  async updateByName(name: string, eventsCreateDto: EventCreateDto): Promise<IEvent> {
    try {
      return await this.eventModel.findOneAndUpdate(name, eventsCreateDto, {new: true}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async update(id: string, eventCreateDto: EventCreateDto): Promise<IEvent> {
    return await this.eventModel.findByIdAndUpdate(id, eventCreateDto, {new: true}).exec();
  }
  async delete(id: string) {
    await this.eventModel.deleteOne({_id: id});
  }
}
