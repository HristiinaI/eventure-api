import { Module } from '@nestjs/common';
import { BoardSchema } from '../schemas/board.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { EventSchema } from 'src/schemas/event.shema';
import { CardSchema } from 'src/schemas/card.shema';
import { CardsService } from 'src/cards/cards.service';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'Board', schema: BoardSchema },
        { name: 'Event', schema:EventSchema },
        { name: 'Card', schema:CardSchema },

    ])],
    controllers: [BoardController],
    providers: [BoardService, CardsService],
})
export class BoardModule {}
