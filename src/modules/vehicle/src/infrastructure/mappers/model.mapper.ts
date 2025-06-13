import { Prisma } from "@prisma/client";

export default class ModelMapper {

    static to(
        orm: Prisma.VehicleMakeModelGetPayload<{}>
    ) {

        const { createdAt, ...rest } = orm;

        return rest;
    };

};