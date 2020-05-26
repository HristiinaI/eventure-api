import { 
  Controller,
  Get, 
  HttpException, 
  Param, 
  HttpStatus, 
  Post, 
  Body, 
  Put, 
  Delete, 
  Query 
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@Controller('chats')
export class ChatController {
  // tslint:disable-next-line:variable-name
  constructor(private _chatService: ChatService) {}

  @Post()
  async create(@Body() chatDto: ChatDto) {
    const result = await this._chatService.create(chatDto);
    return {ok: true, result};
  }
 
  @Get(':id')
  async findById(@Param() params) {
    const result = this._chatService.findById(params.id);
    if (result == null) {
      throw new HttpException('No chat found with such id!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get()
  async findByParam(@Query('param') param: string) {
    let result = null;
    if(param) {
       result = await this._chatService.findAllMessages(param);
      if(result == null) {
          result = await this._chatService.findByName(param);
      }
    } else {
      result = this._chatService.findAll();
    }
    if (result == null) {
      throw new HttpException('No chat found!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() chatDto) {
    const result = await this._chatService.update(id, chatDto);
    if (result == null) {
      throw new HttpException('Update by id not successful!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':id')
  async Delete(@Param('id') id: string) {
    await this._chatService.delete(id);
  }
}
