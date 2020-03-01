import { Controller, Get, HttpException, Param, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationDto } from './organization.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private _organizationService: OrganizationsService) {}

  @Post()
  async create(@Body() organizationDto: OrganizationDto) {
    const result = await this._organizationService.create(organizationDto);
    return {ok: true, result};
  }

  @Get()
  async findAll() {
    return await this._organizationService.findAll();
  }

  @Get(':name')
  async findOrganizationById(@Param() params) {
    const result = await this._organizationService.findByName(params.name);
    if (result == null) {
      throw new HttpException('No organization found!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() organizationDto: OrganizationDto) {
    const result = await this._organizationService.update(id, organizationDto);
    if (result == null) {
      throw new HttpException('Update by id not successful!', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  
  /*@Put('name')
  async updateByEmail(@Param('name') name: string, @Body() organizationDto:OrganizationDto) {
    const result = await this._organizationService.updateByName(name, organizationDto);
    if(result == null) {
      throw new HttpException('Update by name not successful!', HttpStatus.NOT_FOUND);
    }
    return result;
  }*/

  /*
    @Put(':email')
  async updateByEmail(@Param('email') email: string, @Body() usersCreateDto: UsersCreateDto) {
    const result = await this._userService.updateByEmail(email, usersCreateDto);
    if(result == null) {
      throw new HttpException('Update by email not successful!', HttpStatus.NOT_FOUND);
    }
    return result;
  } 
  */

  @Delete(':id')
  async Delete(@Param('id') id: string) {
    await this._organizationService.delete(id);
  }
}
