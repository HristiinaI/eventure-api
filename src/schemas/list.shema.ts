import * as mongoose from 'mongoose';


export const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  boardId: {
    type: String,
    required: true,
  },
  cards: {
    type: [],
  }
});

export interface IList extends mongoose.Document {
  name: string;
  boardId: string;
  cards: string[];
}
