import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../schemas/users.schemas';
import { Model, Mongoose } from 'mongoose';
import { UsersCreateDto } from './users-create.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
// tslint:disable-next-line:no-shadowed-variable
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

    async update(id: number, usersCreateDto: UsersCreateDto): Promise<IUser> {
        try {
            return await this.userModel.findByIdAndUpdate(id, usersCreateDto, {new: true}).exec();
        } catch (Exception) {
            return null;
        }
    }

    async delete(id: number): Promise<IUser> {
        return await this.userModel.findByIdAndDelete(id).exec();
    }

    async findOne(usersCreateDto: UsersCreateDto): Promise<IUser> {
        const { username } = usersCreateDto;
        return await this.userModel.find({ username }).exec();
    }
}
