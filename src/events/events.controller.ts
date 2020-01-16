import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Delete, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import {EventCreateDto} from './dto/event-create.dto';

@Controller('events')
export class EventsController {

  // tslint:disable-next-line:variable-name
  constructor(private _eventService: EventsService) {}

  @Post()
    async create(@Body() eventCreateDto: EventCreateDto) {
      const result = await this._eventService.create(eventCreateDto);
      return {ok: true, result};
    }
  @Get()
    async findAll() {
    return await this._eventService.findAll();
    }

  @Get(':id')
    async findEventById(@Param('id') id: string) {
      const result = await this._eventService.findEventById(id);
      if (result == null) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
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
  async Delete(@Param('id') id) {
    await this._eventService.delete(id);
  }
}
