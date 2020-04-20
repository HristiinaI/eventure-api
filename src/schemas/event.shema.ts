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
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  about: {
    type: String,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Board', 
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
}
