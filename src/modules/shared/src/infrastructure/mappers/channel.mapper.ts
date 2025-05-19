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

};