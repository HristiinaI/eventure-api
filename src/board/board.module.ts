import { Module } from '@nestjs/common';
import { BoardSchema } from '../schemas/board.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Board', 
                                            schema: BoardSchema }])],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}
