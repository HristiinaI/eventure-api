import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from 'src/schemas/card.shema';
import { CardsController } from './cards.controller';
import { BoardSchema } from 'src/schemas/board.shema';
import { BoardService } from 'src/board/board.service';
import { EventSchema } from 'src/schemas/event.shema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Card', schema: CardSchema },
    { name: 'Board', schema: BoardSchema},
    { name: 'Event', schema: EventSchema},
    
  ])],
  controllers: [CardsController],
  providers: [CardsService, BoardService]
})
export class CardsModule {}
