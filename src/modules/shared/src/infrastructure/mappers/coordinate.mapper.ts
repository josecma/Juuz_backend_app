import { Prisma } from "@prisma/client";

export default class CoordinateMapper {
    static to(
        obj: Prisma.JsonValue,
    ): { latitude: number, longitude: number } {

        const { coordinates } = obj as {
            type: "POINT";
            coordinates: {
                latitude: number,
                longitude: number,
            };
        };

        return coordinates;

    };

};
