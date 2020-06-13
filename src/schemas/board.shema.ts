import * as mongoose from 'mongoose';
import {ICard} from "../schemas/card.shema";

export const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },

});

export interface IBoard extends mongoose.Document {
  name: string;
  eventId: string;
}
