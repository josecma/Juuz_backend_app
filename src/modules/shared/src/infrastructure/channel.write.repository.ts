import { Inject, Injectable, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import ChannelMapper from "./mappers/channel.mapper";
import UserChannelMapper from "./mappers/user.channel.mapper";

@Injectable({})
export default class ChannelWriteRepository {

    private readonly logger = new Logger(ChannelWriteRepository.name);

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            userId: string;
            name: string;
            permissions: Array<('publish' | 'subscribe')>;
            items: Array<any>;
        }
    ): Promise<
        {
            name: string;
            permissions: string[];
            items: Array<any>;
        }
    > {

        const { userId, name, permissions, items } = params;

        try {

            const res = await this.client.$transaction(
                async (tx) => {

                    let channel: {
                        name: string;
                        id: string;
                    } | null = null;

                    channel = await tx.channel.findUnique(
                        {
                            where: {
                                name: name,
                            },
                        },
                    );

                    if (channel === null) {
                        channel = await tx.channel.create(
                            {
                                data: {
                                    name: name,
                                },
                            },
                        );
                    };

                    const userChannel = await tx.userChannel.upsert(
                        {
                            where: {
                                channelId_userId: {
                                    userId: userId,
                                    channelId: channel.id,
                                },
                            },
                            update: {
                                items,
                            },
                            create: {
                                userId: userId,
                                channelId: channel.id,
                                permissions,
                                items,
                            },
                        },
                    );

                    return await tx.userChannel.findUnique(
                        {
                            where: {
                                channelId_userId: {
                                    userId: userChannel.userId,
                                    channelId: userChannel.channelId,
                                }
                            },
                            include: {
                                channel: true,
                            },
                        }
                    );

                }
            );

            return UserChannelMapper.to(
                {
                    orm: res,
                }
            );

        } catch (error) {

            throw error;

        };

    };

    public async saveV2(
        params: {
            name: string,
            type: string,
            details: Record<string, unknown>,
        }
    ) {

        const {
            type,
            details,
            name
        } = params;

        try {

            const saveChannelResponse = await this.client.channel.create(
                {
                    data: {
                        name,
                        type,
                        details: details as Prisma.JsonValue,
                    }
                }
            );

            return ChannelMapper.toV2(saveChannelResponse);

        } catch (error) {

            this.logger.error(
                {
                    source: `${ChannelWriteRepository.name}.saveV2`,
                    message: `err saving channel: ${error.message}`
                }
            );

        };

    };

};