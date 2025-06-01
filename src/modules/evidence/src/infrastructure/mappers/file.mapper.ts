import { Prisma } from "@prisma/client";

export default class FileMapper {
    static to(
        orm: Prisma.FileGetPayload<{}>
    ): string {

        const { key } = orm;

        return key;

    };

};
