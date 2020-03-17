import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, WsResponse, BaseWsExceptionFilter, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger, UseFilters } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected:  ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected:  ${client.id}`);
  }

  //@UseFilters(new BaseWsExceptionFilter())
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'msgToClient', data: text };
  }
}
