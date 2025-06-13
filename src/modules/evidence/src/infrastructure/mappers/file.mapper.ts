import { Prisma } from "@prisma/client";

export default class FileMapper {
    static to(
        obj: Prisma.FileGetPayload<{}>
    ) {

        const { key, id } = obj;

        return {
            id,
            key,
        };

    };

};
