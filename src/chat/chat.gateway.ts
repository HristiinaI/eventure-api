import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';

import { JwtService } from '../auth/jwt/jwt.service';
import { IUser } from '../users/interfaces/user.interface';
import { ChatService } from './chat.service';
import { MessageDto } from '../message/dto/message.dto';
import { MessageService } from '../message/message.service';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  connectedUsers: string[] = [];

  constructor(
    private jwtService: JwtService,
    private chatService: ChatService,
  ) {}

  async handleConnection(socket: Socket) {
    const user: IUser = await this.jwtService.verify(
      socket.handshake.query.token,
      true,
    );

    this.connectedUsers = [...this.connectedUsers, String(user._id)];

    socket.emit('join');
  }

  async handleDisconnect(socket: Socket) {
    const user: IUser = await this.jwtService.verify(
      socket.handshake.query.token,
      true,
    );
    const userPos = this.connectedUsers.indexOf(String(user._id));

    if (userPos > -1) {
      this.connectedUsers = [
        ...this.connectedUsers.slice(0, userPos),
        ...this.connectedUsers.slice(userPos + 1),
      ];
    }
  }

  @SubscribeMessage('message')
  async onMessage(client: Socket, data: MessageDto) {

    const event: string = 'message';
    const result = data;

    await this.chatService.updateMessages(data.chatId, data);
    client.broadcast.to(result.chatId).emit(event, result.message);

    return Observable.create(observer =>
      observer.next({ event, data: result.message }),
    );
  }

  @SubscribeMessage('join')
  async onRoomJoin(client: Socket) {
    client.join(client.handshake.query.id);
    const chat = await this.chatService.findById(client.handshake.query.id);
    const messages: string[] = [];
    for (let i = 0; i < chat.messages.length; i++) {
      messages[i] = chat.messages[i].message;
    }
    return messages;
  }

  @SubscribeMessage('leave')
  onRoomLeave(client: Socket, data: MessageDto): void {
    client.leave(data.chatId);
  }
}
