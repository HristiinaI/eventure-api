import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
    chatId: {
        type: String,
    },
    
    sender: {
        type: String,
    },
    
    isUser: {
        type: Boolean,
    },

    message: {
        type: String,
    },
});
