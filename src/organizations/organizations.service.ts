import { InjectModel} from '@nestjs/mongoose';
import { OrganizationDto } from './organization.dto';
import { Injectable } from '@nestjs/common';
import { IOrganization } from 'src/schemas/organization.schema';
import { Model } from 'mongoose';
import { runInThisContext } from 'vm';

@Injectable()
export class OrganizationsService {
  constructor(@InjectModel('Organization') private readonly organizationModel: Model<IOrganization>) {}

  async create(organizationDto: OrganizationDto): Promise<IOrganization> {
    const create = new this.organizationModel(organizationDto);
    create.role = "Organization";
    return await create.save();
  }

  async findAll(): Promise<IOrganization[]> {
    try {
      return await this.organizationModel.find().exec();
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

  async findByName(name: string): Promise<IOrganization> {
    try{
        return await this.organizationModel.findOne({name: name}).exec();       
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
