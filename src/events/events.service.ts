import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {IEvent} from '../schemas/event.shema';
import {Model} from 'mongoose';
import { EventCreateDto } from './dto/event-create.dto';
import { IBoard } from 'src/schemas/board.shema';

@Injectable()
export class EventsService {
  constructor(@InjectModel('Event') 
    private readonly eventModel: Model<IEvent>,
    ) {}

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
  async findByName(name: string): Promise<IEvent> {
    try {
      return await this.eventModel
                        .find({ name: new RegExp(name, "i")}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async findEventsByEmail(email: string): Promise<IEvent[]> {
    try {
      return await this.eventModel.find({members: email});
    } catch (Exception) {
      return null;
    }
  }

  async findByCreator(creator: string): Promise<IEvent[]> {
    try {
      return await this.eventModel.find({ creator }).exec();
    } catch (Exception) {
      return null;
    }
  }
  async update(id: string, eventCreateDto: EventCreateDto): Promise<IEvent> {
    return await this.eventModel.findByIdAndUpdate(id, eventCreateDto,
       {new: true}).exec();
  }
  async delete(id: string) : Promise<IEvent> {
   return await this.eventModel.findByIdAndDelete(id).exec();
  }
  async updateMembers(id: string, member: string){
    const event = await this.eventModel.findById(id).exec();
    await event.members.push(member);
    try {
      return await this.eventModel.findByIdAndUpdate(id, {members: event.members}, {new: true}).exec();
    } catch (Exception) {
      return null;
    }
  }
}
