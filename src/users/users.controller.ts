import { Controller, Get, HttpException, Param, HttpStatus, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCreateDto} from './users-create.dto';

@Controller('users')
export class UsersController {
  // tslint:disable-next-line:variable-name
  constructor(private _userService: UsersService) {}

  @Post()
  async create(@Body() usersCreateDto: UsersCreateDto) {
    const user = await this._userService.create(usersCreateDto);
    return {ok: true, user};
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
      const result = await this._userService.findUserById(id);
      if (result == null) {
        throw new HttpException('No user found with such id!', HttpStatus.NOT_FOUND);
      }
      return result;
  }

  @Get()
  async find(@Query('email') email: string, @Query('firstName') firstName: string) {
    let result = null;
    if(email) {
      result = await this._userService.findByEmail(email);
    } else if(firstName) {
      result = await this._userService.findByName(firstName);
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

  @Put(':email')
  async updateByEmail(@Param('email') email: string, @Body() usersCreateDto: UsersCreateDto) {
    const result = await this._userService.updateByEmail(email, usersCreateDto);
    if (result != null) {
      return result;
    } else {
      throw new HttpException('Update by email not successful!', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async Delete(@Param('id') id: string) {
    await this._userService.delete(id);
  }
}
