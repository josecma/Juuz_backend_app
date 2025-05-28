import { Prisma } from "@prisma/client";
import Identity from "../../domain/entities/identity";

export default class IdentityMapper {
    static to(
        orm: Prisma.IdentityGetPayload<{}>
    ) {
        const {
            id,
            type,
            value,
            verified,
            metadata,
        } = orm;

        return new Identity(
            {
                id,
                type,
                value,
                verified,
                metadata: metadata as Record<string, unknown>,
            }
        );
    };
};