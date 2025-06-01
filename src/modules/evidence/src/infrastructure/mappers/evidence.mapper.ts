import { Prisma } from "@prisma/client";
import GeoPointMapper from "src/modules/shared/src/infrastructure/mappers/geo.point.mapper";
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
    ) {

        const {
            id,
            description,
            status,
            type,
            coordinates,
            evidenceFiles
        } = obj;

        const res = {
            id,
            description,
            status,
            type: type,
            coordinates: GeoPointMapper.to(coordinates),
            files: evidenceFiles.map(
                (e) => e.file
            ),
        };

        return res;

    };

};