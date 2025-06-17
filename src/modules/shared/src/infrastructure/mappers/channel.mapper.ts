import { Prisma } from "@prisma/client";

export default class ChannelMapper {
    static to(
        params: {
            orm: Prisma.ChannelGetPayload<{}>
        },
    ): {
        id: string;
        name: string;
        //type: string;
    } {

        const { orm } = params;

        return {
            id: orm.id.toString(),
            name: orm.name,
            //type: orm.type,
        }
    };

    static toV2(
        orm: Prisma.ChannelGetPayload<{}>
    ) {

        const { id, type, name, details } = orm;

        return {
            id,
            name,
            type,
            details: details as Record<string, unknown>,
        };

    };

};