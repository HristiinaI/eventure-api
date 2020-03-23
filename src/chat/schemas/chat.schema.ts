import { Schema } from 'mongoose';

export const ChatSchema = new Schema({
    name: {
        type: String,
    },

    members: [{
        type: String,
    }],

    messages: [],
    
});