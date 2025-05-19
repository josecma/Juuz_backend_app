import { BaseJSON, FileJSON, GeoPointJSON } from "src/modules/shared/src/domain/shared";

export type EvidenceJSON = BaseJSON & {
    description: string;
    status: boolean;
    type: string;
    geoPoint: GeoPointJSON;
    files: Array<FileJSON>;
};

export type PartialEvidenceJSON = Partial<EvidenceJSON>;

export type UpdateEvidenceJSON = Omit<PartialEvidenceJSON, "id" | "files">;

export type FindOneEvidenceByJSON = Pick<EvidenceJSON, "id">;