import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IBoard } from '../schemas/board.shema';
import {Model} from 'mongoose';
import {BoardCreateDto} from './dto/board-create.dto';


@Injectable()
export class BoardService {
    constructor(@InjectModel('Board') 
                    private readonly boardModel: Model<IBoard>) {}

  async create(boardCreateDto: BoardCreateDto): Promise<IBoard> {
    const createdBoard = new this.boardModel(boardCreateDto);
    return createdBoard.save();
  }

  async findAll(): Promise<IBoard[]> {
    return await this.boardModel.find().exec();
  }
  async findBoardtById(id: string): Promise<IBoard> {
    return await this.boardModel.findById(id).exec();
  }

}
