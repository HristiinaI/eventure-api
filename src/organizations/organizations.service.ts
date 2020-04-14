import { InjectModel} from '@nestjs/mongoose';
import { OrganizationDto } from './organization.dto';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { IOrganization } from '../schemas/organization.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class OrganizationsService {
  constructor(@InjectModel('Organization') private readonly organizationModel: Model<IOrganization>) {}

  async create(organizationDto: OrganizationDto): Promise<IOrganization> {
    if(organizationDto.password) {
      var isOrgReg = await this.findByName(organizationDto.name);
      if(!isOrgReg) {
        organizationDto.password = await bcrypt.hash(organizationDto.password, 10);
        var registeredOrg = new this.organizationModel(organizationDto);
        registeredOrg.role = "Organization";
        return await registeredOrg.save();
      } else {
        throw new HttpException('REGISTRATION.USER_ALREADY_REGISTERED', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException('REGISTRATION.MISSING_MANDATORY_PARAMETERS', HttpStatus.FORBIDDEN);
    }
  }

  async findAll(): Promise<IOrganization[]> {
    try {
      return await this.organizationModel.find().exec();
    } catch (Exception) {
      return null;
    }
  }

  async findByParam(name: string): Promise<IOrganization> {
    return await this.organizationModel.findOne({ name }).exec();  
  }

  async findOrgById(id: string): Promise<IOrganization> {
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
