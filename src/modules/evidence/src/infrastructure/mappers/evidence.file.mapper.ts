import { Prisma } from "@prisma/client";
import FileMapper from "./file.mapper";

export default class EvidenceFileMapper {

    static to(
        obj: Prisma.EvidenceFileGetPayload<{
            include: {
                file: true
            }
        }>
    ): string {

        const { file } = obj;

        return FileMapper.to(file);

    };

};
