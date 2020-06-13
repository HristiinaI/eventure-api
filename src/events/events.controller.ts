import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Delete, Put, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import {EventCreateDto} from './dto/event-create.dto';

@Controller('events')
export class EventsController {
  constructor(private _eventService: EventsService) {}

 @Post()
    async create(@Body() eventCreateDto: EventCreateDto) {
      const result = await this._eventService.create(eventCreateDto);
      return {ok: true, result};
    }
  @Get(':id')
    async findEventById(@Param('id') id: string) {
      const result = await this._eventService.findEventById(id);
      if (result == null) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return result;
    }

  @Get()
    async find(@Query('name') name: string, @Query('creator')creator: string, @Query('email')email: string,
              @Query('id')id: string, @Query('member')member: string
    ) {
      let result = null;
      if (name) {
          result = await this._eventService.findByName(name);
        } else if (creator){
          result = await this._eventService.findByCreator(creator);
        }else if (email){
          result = await this._eventService.findEventsByEmail(email);
        }else if(member){
          result = await this._eventService.updateMembers(id, member)
        }
         else {
          result = this._eventService.findAll();
        }
      if (result == null) {
        throw new HttpException('No event found with such name!', HttpStatus.NOT_FOUND);
      }
      return result;
    }

  @Put(':id')
    async update(@Param('id') id: string, @Body() eventCreateDto: EventCreateDto) {
      const result = await this._eventService.update(id, eventCreateDto);
      if (result == null) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return result;
    }
  @Delete(':id')
    async Delete(@Param('id') id: string) {
      await this._eventService.delete(id);
    }
}
