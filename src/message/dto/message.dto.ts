export class MessageDto {
    constructor(object: any) {
        this.chatId = object.chadId;
        this.sender = object.sender;
        this.isUser= object.isUser;
        this.message = object.messgae;
    }

    chatId: string;
    sender: string;
    isUser: boolean;
    message: string;

}