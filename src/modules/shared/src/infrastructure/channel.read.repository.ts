import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import UserChannelMapper from "./mappers/user.channel.mapper";

@Injectable({})
export default class ChannelReadRepository {

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async findUserChannelBy(
        params: {
            userId: string;
            subStr: string;
        }
    ): Promise<
        Array<
            {
                name: string;
                permissions: Array<string>;
                items: Array<any>;
            }
        >
    > {

        const { userId, subStr } = params;

        try {

            const userChannels = await this.client.userChannel.findMany({
                where: {
                    userId: Number(userId),
                    channel: {
                        name: {
                            contains: subStr,
                            mode: 'insensitive',
                        }
                    },
                },
                include: {
                    channel: true,
                },
            });

            return userChannels.map(
                (orm) => UserChannelMapper.to(
                    {
                        orm
                    }
                )
            );

        } catch (error) {

            throw error;

        };

    };


    public async findUserChannels(
        params: {
            userId: string;
        }
    ) {

        const { userId } = params;

        try {

            const userChannels = await this.client.userChannel.findMany({
                where: {
                    userId: Number(userId)
                },
                include: {
                    channel: true,
                },
            });

            return userChannels.map(
                (uCh) => UserChannelMapper.to(
                    {
                        orm: uCh
                    }
                )
            );

        } catch (error) {

            throw error;

        };

    };

};