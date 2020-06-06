import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
  },
  members: {
    type: [],
  },
  creator: {
    type: String,
    // required: true,
  },
  about: {
    type: String,
  },
  boardId: {
    type: String,
  },
  chatId: {
    type: String,
  }
});

export interface IEvent extends mongoose.Document {
  name: string;
  type: string;
  date: Date;
  location: string;
  members: string[];
  creator: string;
  about: string;
  boardId: string;
  chatId: string
}
