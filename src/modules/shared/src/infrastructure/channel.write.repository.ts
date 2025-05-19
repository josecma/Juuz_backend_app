import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import UserChannelMapper from "./mappers/user.channel.mapper";

@Injectable({})
export default class ChannelWriteRepository {

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
                        id: number;
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
                                    userId: Number(userId),
                                    channelId: channel.id,
                                },
                            },
                            update: {
                                items,
                            },
                            create: {
                                userId: Number(userId),
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

};