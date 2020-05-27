import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICard } from 'src/schemas/card.shema';
import {Model} from 'mongoose';
import { CardCreateDto } from './dto/card-create.dto';
import { IBoard } from 'src/schemas/board.shema';



@Injectable()
export class CardsService {
    constructor(
        @InjectModel('Card') private readonly cardModel: Model<ICard>,
        @InjectModel('Board') private readonly boardModel: Model<IBoard>,
        ) {}

    async create(cardCreateDto: CardCreateDto): Promise<ICard> {
        const createdCard = new this.cardModel(cardCreateDto);
        return createdCard.save();
    }

    async findAll(): Promise<ICard[]> {
        return await this.cardModel.find().exec();
    }
    
    async findCardtById(id: string): Promise<ICard> {
        return await this.cardModel.findById(id).exec();
    }

    async update(id: string, cardCreateDto: CardCreateDto): Promise<ICard> {
        const updatedCard = await this.cardModel.findByIdAndUpdate(id, cardCreateDto,
           {new: true}).exec();
        return updatedCard;
      }

    async delete(id: string): Promise<any> {
        const deleteCard = await this.cardModel.findByIdAndRemove(id);
        return deleteCard;
      }

}
