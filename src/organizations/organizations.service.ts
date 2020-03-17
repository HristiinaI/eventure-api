import { InjectModel} from '@nestjs/mongoose';
import { OrganizationDto } from './dto/organization.dto';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { IOrganization } from './interfaces/organization.interface';
import { IUser } from '../users/interfaces/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class OrganizationsService {
  constructor(@InjectModel('Organization') private readonly organizationModel: Model<IOrganization>,
  @InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(organizationDto: OrganizationDto): Promise<IOrganization> {
    if(organizationDto.password && organizationDto.name) {
      if(this.emailsAreValid(organizationDto.members)) {
        var isOrgReg = await this.findByName(organizationDto.name);
        if(!isOrgReg) {
          organizationDto.password = await bcrypt.hash(organizationDto.password, 10);
          var registeredOrg = new this.organizationModel(organizationDto);
          registeredOrg.role = "Organization";
          return await registeredOrg.save();
        } else {
          throw new HttpException('REGISTRATION.ORGANIZATION_ALREADY_REGISTERED', HttpStatus.FORBIDDEN);
        }
      } else {
        throw new HttpException('REGISTER.THERE_MAY_BE_AN_INVALID_EMAIL_ADDRESS', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException('REGISTRATION.MISSING_MANDATORY_PARAMETERS', HttpStatus.FORBIDDEN);
    }
  }
  
  isValidEmail (email : string) {
    if(email){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else return false
  }
  
  async emailsAreValid(emails: string[]): Promise<boolean> {
    for(let i = 0; i < emails.length; i++) {
      if(!this.isValidEmail(emails[i])) {
        return false;
      } 
    }
    return true;
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
