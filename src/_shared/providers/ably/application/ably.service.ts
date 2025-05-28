import { Injectable } from '@nestjs/common';
import { Realtime } from 'ably';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AblyService {
    private ably: Realtime;

    constructor(private readonly prismaService: PrismaService) {
        this.ably = new Realtime(process.env.ABLY_SECRET);
        const channel = this.ably.channels.get('2'); // Reemplaza 'test-channel' con el nombre de tu canal

        channel.subscribe('message', (message) => {
            console.log('Nuevo mensaje recibido 2:', message.data);
        });

        const channel1 = this.ably.channels.get('3'); // Reemplaza 'test-channel' con el nombre de tu canal

        channel1.subscribe('message', (message) => {
            console.log('Nuevo mensaje recibido 3:', message.data);
        });

        const channel2 = this.ably.channels.get('1'); // Reemplaza 'test-channel' con el nombre de tu canal

        channel2.subscribe('message', (message) => {
            console.log('Nuevo mensaje recibido 1:', message.data);
        });

        const channel3 = this.ably.channels.get('4'); // Reemplaza 'test-channel' con el nombre de tu canal

        channel3.subscribe('message', (message) => {
            console.log('Nuevo mensaje recibido 4:', message.data);
        });

        const channel4 = this.ably.channels.get('5'); // Reemplaza 'test-channel' con el nombre de tu canal

        channel4.subscribe('message', (message) => {
            console.log('Nuevo mensaje recibido 5:', message.data);
        });
    }

    async getToken(userId: number): Promise<any> {
        const userChannel = await this.prismaService.ablyChannel.findUnique({
            where: {
                userId: userId.toString(),
            },
        });
        const tokenRequest = await this.ably.auth.createTokenRequest({
            clientId: userChannel.ablyUser,
            capability: {
                [userChannel.userId]: ['subscribe'],
            },
        });
        const tokenDetails = await this.ably.auth.requestToken(tokenRequest);
        return {
            token: tokenDetails.token,
            ablyUser: userChannel.ablyUser,
            channelName: userChannel.userId,
        };
    }

    async sendMessage(channelName: string, message: any) {
        const channel = this.ably.channels.get(channelName);
        await channel.publish('message', message);
    }

    async createChannel(channelName: string): Promise<void> {
        const channel = this.ably.channels.get(channelName);
        await channel.attach();
    }
}
