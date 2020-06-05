import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IBoard } from '../schemas/board.shema';
import {Model} from 'mongoose';
import {BoardCreateDto} from './dto/board-create.dto';
import {CardCreateDto} from '../cards/dto/card-create.dto';
import { IEvent } from 'src/schemas/event.shema';
import { ICard } from 'src/schemas/card.shema';


@Injectable()
export class BoardService {
  constructor(
    @InjectModel('Board') private readonly boardModel: Model<IBoard>,
    @InjectModel('Event') private readonly eventModel: Model<IEvent>,
    @InjectModel('Card') private readonly cardModel: Model<ICard>
    ) {}

  async create(boardCreateDto: BoardCreateDto): Promise<IBoard> {
    const createdBoard = new this.boardModel(boardCreateDto);
    return createdBoard.save();
  }

  async findAll(): Promise<IBoard[]> {
    return await this.boardModel.find()
    .populate({path: 'event', select: 'type'})
    .exec();
  }
  async findBoardtById(id: string): Promise<IBoard> {
    return await this.boardModel.findById(id).exec();
  }

  // async updateCards(cardCreateDto: CardCreateDto): Promise<ICard> {
  //   const board = await this.boardModel.findById(cardCreateDto.boardId).exec();
  //   await board.cards.push(cardCreateDto);
  //   try {
  //     return await this.boardModel.findByIdAndUpdate(cardCreateDto.boardId, {cards: board.cards}, {new: true}).exec();
  //   } catch (Exception) {
  //     return null;
  //   }
  // }

}
