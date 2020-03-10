import * as mongoose from 'mongoose';
import { string } from 'prop-types';

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
  creator: {
    type: String,
    required: true,
  }
});

export interface IEvent extends mongoose.Document {
  name: string;
  type: string;
  date: Date;
  location: string;
  members: string[];
  creator: string;
}
