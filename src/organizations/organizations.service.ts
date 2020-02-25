import { InjectModel} from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { OrganizationDto } from './organization.dto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class OrganizationsService<IOrganization extends Mongoose> {
  constructor(@InjectModel('Organization') private readonly organizationModel) {}

  async create(organizationDto: OrganizationDto): Promise<IOrganization> {
    const create = new this.organizationModel(organizationDto);
    return await create.save();
  }

  async findAll(): Promise<IOrganization[]> {
    try {
      return this.organizationModel.find().exec();
    } catch (Exception) {
      return null;
    }
  }

  async findOrganizationById(id: string): Promise<IOrganization> {
    try {
      return await this.organizationModel.findById(id).exec();
    } catch (Exception) {
      return null;
    }
  }

  async update(id: string, organizationDto: OrganizationDto): Promise<IOrganization> {
    try {
      return await this.organizationModel.findByIdAndUpdate(id, organizationDto, {new: true}).exec();
    } catch (Exception) {
      return null;
    }
  }

  async delete(id: string): Promise<IOrganization> {
    return await this.organizationModel.findByIdAndDelete(id).exec();
  }
}
