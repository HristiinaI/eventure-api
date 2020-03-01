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
      default: Date.now 
    },

});

export interface IEvent extends mongoose.Document {
  name: string;
  type: string;
  

}
