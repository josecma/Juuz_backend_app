import { Prisma } from "@prisma/client";
import IStoragePort from "src/modules/shared/src/application/ports/i.storage.port";
import CoordinateMapper from "src/modules/shared/src/infrastructure/mappers/coordinate.mapper";
import EvidenceFileMapper from "./evidence.file.mapper";

export default class EvidenceMapper {

    static async to(
        obj: Prisma.EvidenceGetPayload<{
            include: {
                evidenceFiles: {
                    include: {
                        file: true;
                    };
                };
            };
        }>,
        storage: IStoragePort,
    ): Promise<{
        id: string;
        description: string;
        status: boolean;
        type: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        files: [string, string][];
    }> {

        const {
            id,
            description,
            status,
            type,
            coordinates,
            evidenceFiles
        } = obj;

        const urlKeyMap = await Promise.all(
            await storage.getFileUrls(
                {
                    keys: evidenceFiles.map(
                        (ef) => EvidenceFileMapper.to(ef)
                    ),
                }
            )
        );

        const res = {
            id,
            description,
            status,
            type: type,
            coordinates: CoordinateMapper.to(coordinates),
            files: urlKeyMap,
        };

        return res;

    };

};