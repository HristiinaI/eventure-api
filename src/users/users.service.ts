import { InjectModel} from '@nestjs/mongoose';
import { UsersCreateDto } from './users-create.dto';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from '../schemas/users.schemas';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async findAll(): Promise<IUser[]> {
        try {
            return await this.userModel.find().exec();
        } catch (Exception) {
            return null;
        }
    }

    async findUserById(id: string): Promise<IUser> {
        try {
            return await this.userModel.findById(id).exec();
        } catch (Exception) {
            return null;
        }
    }

    async findByEmail(email: string): Promise<IUser> {
        try {
            return await this.userModel.findOne({email}).exec();
        } catch (Exception) {
            return null;
        }
    }

    async findByName(firstName: string): Promise<IUser> {
        try {
            return await this.userModel.findOne({ firstName }).exec();
        } catch(Exception) {
            return null;
        }
    }

    async create(usersCreateDto: UsersCreateDto): Promise<IUser> {
        if (this.isValidEmail(usersCreateDto.email) && usersCreateDto.password){
            const isUserReg = await this.findByEmail(usersCreateDto.email);
            if (!isUserReg) {
                usersCreateDto.password = await bcrypt.hash(usersCreateDto.password, 10);
                let registeredUser = new this.userModel(usersCreateDto);
                registeredUser.role = 'User';
                return await registeredUser.save();
            } else {
                throw new HttpException('REGISTRATION.USER_ALREADY_REGISTERED', HttpStatus.FORBIDDEN);
            } 
        } else {
            throw new HttpException('REGISTRATION.MISSING_MANDATORY_PARAMETERS', HttpStatus.FORBIDDEN);
        }
    }

    isValidEmail (email : string){
        if(email){
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        } else return false
    }

    async update(id: string, usersCreateDto: UsersCreateDto): Promise<IUser> {
        try {
            return await this.userModel.findByIdAndUpdate(id, usersCreateDto, {new: true}).exec();
        } catch (Exception) {
            return null;
        }
    }

    async delete(id: string): Promise<IUser> {
        return await this.userModel.findByIdAndDelete(id).exec();
    }
}
