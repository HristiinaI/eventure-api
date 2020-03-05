import { Controller, Get, HttpException, Param, HttpStatus, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationDto } from './organization.dto';

@Controller('organizations')
export class OrganizationsController {
  // tslint:disable-next-line:variable-name
  constructor(private _organizationService: OrganizationsService) {}

  @Post()
  async create(@Body() organizationDto: OrganizationDto) {
    const result = await this._organizationService.create(organizationDto);
    return {ok: true, result};
  }

  @Get(':id')
  async findById(@Param() params) {
    const result = this._organizationService.findOrgById(params.id);
    if (result == null) {
      throw new HttpException('No organization found with such id!', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get()
  async findByParam(@Query('name') name: string) {
    let result = null;
    if(name) {
      result = await this._organizationService.findByParam(name);
    } else {
      result = this._organizationService.findAll();
    }
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

  @Delete(':id')
  async Delete(@Param('id') id: string) {
    await this._organizationService.delete(id);
  }
}
