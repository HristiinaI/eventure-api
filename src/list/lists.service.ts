import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IList } from '../schemas/list.shema';
import {Model} from 'mongoose';
import {ListCreateDto} from './dto/list-create.dto';

@Injectable()
export class ListsService {
    constructor(@InjectModel('List') private readonly listModel: Model<IList>) {}

    async create(listCreateDto: ListCreateDto): Promise<IList> {
      const createdList = new this.listModel(listCreateDto);
      return createdList.save();
    }
  
    async findAll(): Promise<IList[]> {
      return await this.listModel.find().exec();
    }
    async findListById(id: string): Promise<IList> {
      return await this.listModel.findById(id).exec();
    }
  
}
