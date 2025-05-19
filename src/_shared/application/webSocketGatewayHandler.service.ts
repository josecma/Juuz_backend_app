import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WebSocketService } from './webSocket.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class WebSocketGatewayHandler implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly webSocketService: WebSocketService) {}

  handleConnection(client: Socket) {
    // Lógica que se ejecuta cuando un cliente se conecta
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // Lógica que se ejecuta cuando un cliente se desconecta
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe')
  handleSubscription(client: Socket, payload: { userId: string }): void {
    const { userId } = payload;
    this.webSocketService.subscribeUser(userId, client);
    client.emit('subscribed', `User ${userId} subscribed successfully`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, payload: { userId: string, message: string }): void {
    const { userId, message } = payload;
    this.webSocketService.sendMessageToUser(userId, message);
  }
}
