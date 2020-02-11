import { Controller, Get, HttpException, Param, HttpStatus, Post, Body, Put, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCreateDto} from './users-create.dto';

@Controller('users')
export class UsersController {
  // tslint:disable-next-line:variable-name
  constructor(private _userService: UsersService<any>) {}

  @Post()
  async create(@Res() res, @Body() usersCreateDto: UsersCreateDto) {
    const user = await this._userService.create(usersCreateDto);
    return {ok: true, user};
  }

  @Get()
  async findAll() {
      return await this._userService.findAll();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
      const result = await this._userService.findUserById(id);
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
