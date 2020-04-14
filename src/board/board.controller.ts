import { Controller, Post, Body, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import {BoardCreateDto} from './dto/board-create.dto';
import {BoardService} from './board.service';

@Controller('board')
export class BoardController {
    // tslint:disable-next-line:variable-name
  constructor(private _boardService: BoardService) {}

    @Post()
    async create(@Body() boardCreateDto: BoardCreateDto) {
      const result = await this._boardService.create(boardCreateDto);
      return {ok: true, result};
    }

    @Get(':id')
    async findBoardById(@Param('id') id: string) {
      const result = await this._boardService.findBoardtById(id);
      if (result == null) {
        throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
      }
      return result;
    }
    
    @Get()
    async findAll() {
    return await this._boardService.findAll();
    }

}
