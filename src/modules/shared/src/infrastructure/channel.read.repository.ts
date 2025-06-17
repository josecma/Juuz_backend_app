import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import ChannelMapper from "./mappers/channel.mapper";
import UserChannelMapper from "./mappers/user.channel.mapper";

@Injectable({})
export default class ChannelReadRepository {

    private readonly logger = new Logger(ChannelReadRepository.name);

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async findUserPrivateChannel(
        userId: string
    ) {

        try {

            const userPrivateChannelResponse = await this.client.userChannel.findFirst(
                {
                    where: {
                        userId: userId,
                        channel: {
                            name: {
                                contains: "private",
                                mode: 'insensitive',
                            }
                        },
                    },
                    include: {
                        channel: true,
                    },
                }
            );

            return userPrivateChannelResponse != null ? UserChannelMapper.to({ orm: userPrivateChannelResponse }) : null

        } catch (error) {

            throw error;

        };

    };

    public async findCompanyPrivateChannel(
        companyId: string
    ) {

        try {

            const companyPrivateChannelResponse = await this.client.channel.findFirst(
                {
                    where: {
                        name: {
                            contains: "company:private"
                        },
                        AND: [
                            {
                                details: {
                                    path: ["owner", "type"],
                                    equals: 'company',
                                },
                            },
                            {
                                details: {
                                    path: ["owner", "id"],
                                    equals: companyId,
                                },
                            }
                        ]
                    },
                }
            );

            return companyPrivateChannelResponse ? ChannelMapper.toV2(companyPrivateChannelResponse) : null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${ChannelReadRepository.name}`,
                    message: `err finding private company channel: ${error.message}`
                }
            );

        };

    };

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
                    userId: userId,
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
                    userId: userId
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