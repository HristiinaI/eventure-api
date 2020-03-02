import { Controller, Get, HttpException, Param, HttpStatus, Post, Body, Put, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCreateDto} from './users-create.dto';

@Controller('users')
export class UsersController {
  constructor(private _userService: UsersService) {}

  
  @Post()
  async create(@Body() usersCreateDto: UsersCreateDto) {
    const user = await this._userService.create(usersCreateDto);
    return {ok: true, user};
  }

  @Get()
  async findAll() {
      return await this._userService.findAll();
  }

  /*@Get(':id')
  async findUserById(@Param('id') id: string) {
      const result = await this._userService.findUserById(id);
      if (result == null) {
        throw new HttpException('No user found with such id!', HttpStatus.NOT_FOUND);
      }
      return result;
  }
*/

  @Get(':email')
  async findOne(@Param("email") email: string, @Param("_id") id: string, @Param("firstName") firstName: string) {
    const result = await this._userService.findByParam(id, email, firstName);
    if(result == null) {
      //return await this.find(params);
      throw new HttpException('No user found!', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  
  @Get(':firstName')
   async find(@Param() params) {
    const result = await this._userService.findByParam(params.id, params.email, params.firstName);
    if(result == null) {
      throw new HttpException('No user found with such name!', HttpStatus.NOT_FOUND);
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
    if(result == null) {
      throw new HttpException('Update by email not successful!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':id')
  async Delete(@Param('id') id: string) {
    await this._userService.delete(id);
  }
}
