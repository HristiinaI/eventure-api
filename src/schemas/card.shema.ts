import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  status: {
    type: String
  },
  icon: {
    type: String
  },
  boardId: {
    type: String,
  },
  content: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
});

export interface ICard extends mongoose.Document {
  title: string;
  boardId: string;
  content: string;
  date: Date;
  status: string;
  icon: string;
}
