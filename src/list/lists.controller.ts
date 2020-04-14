import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListCreateDto } from './dto/list-create.dto';

@Controller('lists')
export class ListsController {
    constructor(private _listService: ListsService) {}

    @Post()
    async create(@Body() listCreateDto: ListCreateDto) {
        const result = await this._listService.create(listCreateDto);
        return {ok: true, result};
    }

    @Get(':id')
    async findListById(@Param('id') id: string) {
        const result = await this._listService.findListById(id);
        if (result == null) {
        throw new HttpException('List not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }
    
    @Get()
    async findAll() {
    return await this._listService.findAll();
    }
}
