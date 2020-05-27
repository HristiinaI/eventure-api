import { Controller, Body, Post, Get, Param, HttpException, HttpStatus, Put, Delete } from '@nestjs/common';
import {CardsService} from './cards.service';
import { CardCreateDto } from './dto/card-create.dto';
import   { BoardService } from '../board/board.service';
import { throws } from 'assert';

@Controller('cards')
export class CardsController {
    constructor(private _cardService: CardsService, private readonly boardService: BoardService) {}

    @Post()
    async create(@Body() cardCreateDto: CardCreateDto) {
      const result = await this._cardService.create(cardCreateDto);
      await this.boardService.updateCards(result.boardId, cardCreateDto);
      return {ok: true, result};
    }

    @Get(':id')
    async findCardById(@Param('id') id: string) {
      const result = await this._cardService.findCardtById(id);
      if (result == null) {
        throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
      }
      return result;
    }
    
    @Get()
      async findAll() {
      return await this._cardService.findAll();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() cardCreateDto: CardCreateDto) {
      const result = await this._cardService.update(id, cardCreateDto);
      if (result == null) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return result;
    }
  @Delete(':id')
    async Delete(@Param('id') id: string) {
      await this._cardService.delete(id);
    }
}
