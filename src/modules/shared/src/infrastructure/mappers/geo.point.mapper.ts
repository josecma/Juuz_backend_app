import { Prisma } from "@prisma/client";

export default class GeoPointMapper {

    static to(
        orm: Prisma.JsonValue,
    ) {

        return orm as {
            type: "POINT";
            coordinates: {
                latitude: number,
                longitude: number,
            };

        };

    };
};