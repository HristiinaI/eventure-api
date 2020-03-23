import Document from 'mongoose';
import { IMessage } from 'src/message/interfaces/message.interface';

export interface IChat extends Document {
    name: string;
    members: String[];
    messages: IMessage[];
}