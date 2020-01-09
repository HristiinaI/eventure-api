import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  name: String,
  type: Boolean,
});

export interface IEvent extends mongoose.Document {
  name: string;
  type: boolean;
}
