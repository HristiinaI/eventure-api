import { InjectModel} from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { UsersCreateDto } from './users-create.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService<IUser extends Mongoose> {
    constructor(@InjectModel('User') private readonly userModel) {}

    async create(usersCreateDto: UsersCreateDto): Promise<IUser> {
        const create = new this.userModel(usersCreateDto);
        return await create.save();
    }

    async findAll(): Promise<IUser[]> {
        try {
            return this.userModel.find().exec();
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

    async delete(id: string): Promise<IUser> {
        return await this.userModel.findByIdAndDelete(id).exec();
    }

    async findOne(usersCreateDto: UsersCreateDto): Promise<IUser> {
        const { username } = usersCreateDto;
        return await this.userModel.find({ username }).exec();
    }
}
