import { Prisma } from "@prisma/client";

export default class LocationMapper {

    static to(
        orm: Prisma.JsonValue,
    ) {

        const {
            type,
            coordinates,
        } = orm as {
            type: 'POINT',
            coordinates: {
                latitude: number,
                longitude: number,
            },
        };

        const {
            latitude,
            longitude,
        } = coordinates;

        return {
            latitude,
            longitude,
        };

    };
};