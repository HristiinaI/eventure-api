import { Controller, Get, HttpException, Param, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationDto } from './organization.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private _organizationService: OrganizationsService<any>) {}

  @Post()
  async create(@Body() organizationDto: OrganizationDto) {
    const result = await this._organizationService.create(organizationDto);
    return {ok: true, result};
  }

  @Get()
  async findAll() {
    return await this._organizationService.findAll();
  }

  @Get(':id')
  async findOrganizationById(@Param('id') id: string) {
    const result = await this._organizationService.findOrganizationById(id);
    if (result == null) {
      throw new HttpException('No organization found!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() organizationDto: OrganizationDto) {
    const result = await this._organizationService.update(id, organizationDto);
    if (result == null) {
      throw new HttpException('Update not successful!', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  
  @Delete(':id')
  async Delete(@Param('id') id: string) {
    await this._organizationService.delete(id);
  }
}
