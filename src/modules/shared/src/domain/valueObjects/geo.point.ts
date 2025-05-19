import { GeoPointJSON } from "../shared";
import Geo from "./geo";

export default class GeoPoint extends Geo {
    private coordinates: [number, number];

    public constructor(params: { longitude: number; latitude: number; }) {

        const { longitude, latitude } = params;

        super({ type: "POINT" });

        this.coordinates = [longitude, latitude];

    };

    public toString(): string {
        return `Point(${this.coordinates[0]}, ${this.coordinates[1]})`;
    };

    public toJSON(): GeoPointJSON {
        return {
            type: "POINT",
            coordinates: {
                longitude: this.coordinates[0],
                latitude: this.coordinates[1],
            },
        };
    };

};