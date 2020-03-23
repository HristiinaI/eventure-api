import { IMessage } from "src/message/interfaces/message.interface";

export class ChatDto {
    name: string;
    members: string[];
    messages: IMessage[];
}