import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {IEvent} from '../shemas/event.shema';
import {Model} from 'mongoose';
import { EventCreateDto } from './dto/event-create.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel('Event') private readonly eventModel: Model<IEvent>) {}

  async create(eventCreateDto: EventCreateDto): Promise<IEvent> {
    const createdEvent = new this.eventModel(eventCreateDto);
    return createdEvent.save();
  }

  async findAll(): Promise<Event> {
    return await this.eventModel.find().exec();
  }

  async findEventById(id: string): Promise<IEvent> {
    return await this.eventModel.findById(id).exec();
  }

  async update(id: string, eventCreateDto: EventCreateDto): Promise<IEvent> {
    return await this.eventModel.findByIdAndUpdate(id, eventCreateDto, {new: true}).exec();
  }
}
