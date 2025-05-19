import { Prisma } from "@prisma/client";
import ChannelMapper from "./channel.mapper";

export default class UserChannelMapper {
    static to(
        params: {
            orm: Prisma.UserChannelGetPayload<{
                include: {
                    channel: true,
                }
            }>
        },
    ): {
        name: string;
        permissions: string[];
        items: Array<any>;
    } {

        const { orm } = params;

        const { channel, permissions, items } = orm;

        const { name } = ChannelMapper.to(
            {
                orm: channel,
            }
        );

        return {
            name,
            permissions,
            items: items as Array<any>,
        };

    };

};