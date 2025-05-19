import { getDistance } from "geolib";
import IGeoService from "../../application/ports/i.geo.service";

export default class GeoAdapter implements IGeoService {
    distance(params: { p1: { latitude: number; longitude: number; }; p2: { latitude: number; longitude: number; }; }): number {

        const { p1, p2 } = params;

        return getDistance(p1, p2);

    };
};