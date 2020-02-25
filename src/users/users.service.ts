import { InjectModel} from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { UsersCreateDto } from './users-create.dto';
import { Injectable } from '@nestjs/common';
import { EXDEV } from 'constants';
import { Model } from 'mongoose';
import { IUser } from '../schemas/users.schemas';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async create(usersCreateDto: UsersCreateDto): Promise<IUser> {
        const create = new this.userModel(usersCreateDto);
        return await create.save();
    }

    async findAll(): Promise<IUser[]> {
        try {
            return await this.userModel.find().exec();
        } catch (Exception) {
            return null;
        }
    }

    async findByEmail(email: string): Promise<IUser> {
        try{
            return await this.userModel.findOne({email: email}).exec();       
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

    async update(id: string, usersCreateDto: UsersCreateDto): Promise<IUser> {
        try {
            return await this.userModel.findByIdAndUpdate(id, usersCreateDto, {new: true}).exec();
        } catch (Exception) {
            return null;
        }
    }

    async updateByEmail(email: string, usersCreateDto: UsersCreateDto): Promise<IUser> {
        try{
            return await this.userModel.findOneAndUpdate(email, usersCreateDto, {new: true}).exec();
        } catch(Exception) {
            return null;
        }
    }

    async delete(id: string): Promise<IUser> {
        return await this.userModel.findByIdAndDelete(id).exec();
    }

    async doesUserExist(email: string): Promise<IUser> {
        try {
            return await this.findByEmail(email);
        } catch(Exception) {
            return null;
        }
        
        
    }
}
