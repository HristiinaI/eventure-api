import { Controller, Get, HttpException, Param, HttpStatus, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCreateDto} from './users-create.dto';

@Controller('users')
export class UsersController {
  constructor(private _userService : UsersService) {}

  @Post()
  async create(@Body() usersCreateDto : UsersCreateDto) {
    const result = await this._userService.create(usersCreateDto)
    return {ok:true, result}
  }

  @Get()
  async findAll() {
      return await this._userService.findAll();
  }

  @Get(":id")
  async findUserById(@Param(":id") id : number) {
      const result = await this._userService.findUserById(id);
      if(result == null) {
        throw new HttpException("No user found!", HttpStatus.NOT_FOUND);
      }
      return result;
  }

  @Patch(":id")
  async update(@Param(":id") id : number, @Body() userCreateDto : UsersCreateDto) {
      const result = await this._userService.update(id, userCreateDto);
      if(result == null) {
        throw new HttpException("Update not successfull!", HttpStatus.NOT_FOUND);
      }
      return result;
  }

  @Delete('delete/:id')
  async Delete(@Param(':id') id : number){
    await this._userService.delete(id);
  }
}