import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
export class WebSocketService {
  @WebSocketServer()
  server: Server;

  private userSockets: Map<string, Socket> = new Map();

  // Método para suscribir al usuario
  subscribeUser(userId: string, client: Socket): void {
    // Almacena el socket del usuario
    this.userSockets.set(userId, client);
    client.on('disconnect', () => {
      // Elimina el socket cuando el usuario se desconecta
      this.userSockets.delete(userId);
    });
  }

  // Método para enviar información al usuario conectado
  sendMessageToUser(userId: string, message: string): void {
    const client = this.userSockets.get(userId);
    if (client) {
      client.emit('message', message);
    } else {
      console.warn(`User with ID ${userId} is not connected.`);
    }
  }
}
