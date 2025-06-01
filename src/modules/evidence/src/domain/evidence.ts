import Base from "src/modules/shared/src/domain/base";
import File from "src/modules/shared/src/domain/file";
import GeoPoint from "src/modules/shared/src/domain/valueObjects/geo.point";
import { EvidenceJSON } from "./types";

export default class Evidence extends Base {

    description: string;
    private status: boolean;
    type: string;
    geoPoint: GeoPoint;

    public constructor(
        params: {
            id?: string,
            description: string,
            type: string,
            geoPoint: GeoPoint,
        }
    ) {

        const { id, description, geoPoint, type } = params;

        super({ id });

        this.description = description;
        this.status = false;
        this.geoPoint = geoPoint;
        this.type = type;

    };

    public setStatus(params: { value: boolean; }): void {

        const { value } = params;

        this.status = value;

    };

    public toJSON() {
        return {
            id: this.id,
            description: this.description,
            status: this.status,
            type: this.type,
            geoPoint: this.geoPoint.toJSON(),
        };
    };

};