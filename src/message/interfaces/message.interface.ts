import Document from 'mongoose';

export interface IMessage extends Document {
    chatId: string;
    sender: string;
    isUser: boolean;
    message: string;
}
