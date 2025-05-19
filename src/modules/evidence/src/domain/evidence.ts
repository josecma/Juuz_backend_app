import Base from "src/modules/shared/src/domain/base";
import File from "src/modules/shared/src/domain/file";
import GeoPoint from "src/modules/shared/src/domain/valueObjects/geo.point";
import { EvidenceJSON } from "./types";

export default class Evidence extends Base {

    description: string;
    private status: boolean;
    type: string;
    geoPoint: GeoPoint;
    private files: Array<File>;

    public constructor(params: {
        id?: string;
        description: string;
        type: string;
        geoPoint: GeoPoint;
        files: Array<File>;
    }) {

        const { id, description, geoPoint, files = [], type } = params;

        super({ id });

        this.description = description;
        this.status = false;
        this.geoPoint = geoPoint;
        this.files = files;
        this.type = type;

    };

    public setStatus(params: { value: boolean; }): void {

        const { value } = params;

        this.status = value;

    };

    public getFiles(): Array<File> {

        return this.files;

    };

    public toJSON(): EvidenceJSON {
        return {
            id: this.id,
            description: this.description,
            status: this.status,
            type: this.type,
            geoPoint: this.geoPoint.toJSON(),
            files: this.files.map((file) => file.toJSON()),
        };
    };

};