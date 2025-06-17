import { Prisma } from "@prisma/client";
import LocationMapper from "./location.mapper";

export default class AddressMapper {

    static to(
        orm: Prisma.AddressGetPayload<{}>
    ) {

        const { location, metadata, ...addressRest } = orm;

        return {
            ...addressRest,
            metadata: metadata as Record<string, unknown>,
            location: LocationMapper.to(location),
        };

    };

};