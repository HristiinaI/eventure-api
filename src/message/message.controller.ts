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
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { ChatService } from 'src/chat/chat.service';

@Controller('messages')
export class MessageController {
  // tslint:disable-next-line:variable-namlsof -i:3000
  constructor(private _messageService: MessageService,
              // tslint:disable-next-line:variable-name
              private _chatService: ChatService) {}

  @Post()
  async create(@Body() messageDto: MessageDto) {
    const result = await this._messageService.create(messageDto);
    await this._chatService.updateMessages(result.chatId, messageDto);
    return {ok: true, result};
  }

  @Get(':id')
  async findById(@Param() params) {
    const result = this._messageService.findById(params.id);
    if (result == null) {
      throw new HttpException('No message found with such id!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get()
  async findByParam(@Query('param') param: string) {
    let result = null;
    if (param) {
      result = await this._messageService.findAllPerChatId(param);
    } else {
      result = this._messageService.findAll();
    }
    if (result == null) {
      throw new HttpException('No message found!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() messageDto: MessageDto) {
    const result = await this._messageService.update(id, messageDto);
    if (result == null) {
      throw new HttpException('Update by id not successful!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':id')
  async Delete(@Param('id') id: string) {
    await this._messageService.delete(id);
  }
}
