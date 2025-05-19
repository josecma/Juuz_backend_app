import { Prisma } from "@prisma/client";

export default class FileMapper {
    static to(
        obj: Prisma.FileGetPayload<{}>
    ): string {

        const { key } = obj;

        return key;

    };

};
