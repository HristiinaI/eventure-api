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
    required: true,
  },
  members: {
    type: [],
  },

});

export interface IEvent extends mongoose.Document {
  name: string;
  type: string;
  date: Date;
  location: string;
  members: string[];
}
