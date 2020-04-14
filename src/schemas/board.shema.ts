import * as mongoose from 'mongoose';


export const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  lists: {
    type: [],
  },
  event: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Event', 
  }
  
});

export interface IBoard extends mongoose.Document {
  name: string;
  eventId: string;
  lists: string[];
}
