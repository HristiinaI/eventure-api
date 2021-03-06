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
import { UsersService } from './users.service';
import { UsersCreateDto} from './dto/users-create.dto';

@Controller('users')
export class UsersController {
  constructor(private _userService: UsersService) {}

  @Post()
  async create(@Body() usersCreateDto: UsersCreateDto) {
    const user = await this._userService.create(usersCreateDto);
    return {ok: true, user};
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
      const result = await this._userService.findById(id);
      if (result == null) {
        throw new HttpException('No user found with such id!', HttpStatus.NOT_FOUND);
      }
      return result;
  }

  @Get()
  async find(@Query('param') param: string) {
    let result = null;
    if(param) {
      result = await this._userService.findById(param);
      if(result == null) {
        result = await this._userService.findByEmail(param);
        if(result == null) {
          result = await this._userService.findByFirstName(param);
        }
      }
    } else {
      result = await this._userService.findAll();
    }
  
    if (result == null) {
      throw new HttpException('No user found!', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userCreateDto: UsersCreateDto) {
    const result = await this._userService.update(id, userCreateDto);
    if (result == null) {
      throw new HttpException('Update not successful!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':id')
  async Delete(@Param('id') id: string) {
    await this._userService.delete(id);
  }
}