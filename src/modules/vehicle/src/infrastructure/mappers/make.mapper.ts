import { Prisma } from "@prisma/client";
import ModelMapper from "./model.mapper";

export default class MakeMapper {

    static to(
        orm: Prisma.VehicleMakeGetPayload<{}>
    ) {

        const {
            createdAt,
            ...rest
        } = orm;

        return {
            ...rest
        };
    };

};