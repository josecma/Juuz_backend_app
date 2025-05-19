import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Realtime, TokenParams } from 'ably';

@Injectable({})
export default class AblyAdapter {

    private ably: Realtime;
    private readonly logger = new Logger(AblyAdapter.name);
    private readonly apiKey: string;

    constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {

        this.apiKey = this.configService.get<string>('ABLY_SECRET');
        this.connect();

    };

    public async createToken(
        params: {
            memberId: string;
            channels: { [x: string]: string[]; };
        }
    ): Promise<
        {
            token: string;
            channels: string[];
            memberId: string;
        }> {

        const { memberId, channels } = params;

        try {

            const tokenParams: TokenParams = {
                clientId: memberId,
                ...channels,
                ttl: 3600000
            };

            const tokenRequest = await this.ably.auth.createTokenRequest(
                tokenParams
            );

            const tokenDetails = await this.ably.auth.requestToken(tokenRequest);

            return {
                token: tokenDetails.token,
                channels: Object.entries(channels).map(([k, v]) => k),
                memberId,
            };


        } catch (error) {

            this.logger.error(
                `Error generating ably token for client ${memberId}`,
                error.stack,
            );

            throw new Error(
                `Failed to create ably token: ${error.message}`,
            );

        };

    };

    public createChannel(
        params: {
            name: string;
        }
    ) {

        const { name } = params;

        try {

            const newChannel = this.ably.channels.get(
                name,
                {
                    modes: ['PRESENCE', 'PUBLISH', 'SUBSCRIBE']
                }
            );

            return newChannel;

        } catch (error) {

            this.logger.error(
                `Error creating channel ${name}`,
                error.stack,
            );

        };

    };

    private connect() {

        if (this.ably) return;

        try {

            if (!this.apiKey) {

                throw new Error('ABLY_API_KEY is missing in environment variables');

            };

            this.ably = new Realtime({
                key: this.apiKey,
            });

            this.logger.log('Successfully connected to Ably');

        } catch (error) {

            this.logger.error('Failed to connect to Ably', error.stack);

            throw new Error(`Ably connection error: ${error.message}`);

        };

    };

    public async publishMessage(
        channelName: string,
        message: any,
        messageName?: string,
    ): Promise<void> {

        try {

            const channel = this.ably.channels.get(channelName);

            await channel.publish(
                messageName ?? 'message',
                message
            );

            this.logger.log(`Message published to ${channelName}`);

        } catch (error) {

            this.logger.error(
                `Error publishing to ${channelName}`,
                error.stack,
            );

            throw new Error(`Publish failed: ${error.message}`);

        };

    };

};