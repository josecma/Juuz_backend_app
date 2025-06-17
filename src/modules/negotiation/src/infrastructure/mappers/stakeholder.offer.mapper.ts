import { Prisma } from "@prisma/client";

export default class StakeholderOfferMapper {

    static to(
        orm: Prisma.StakeholderOfferGetPayload<{}>
    ) {

        const {
            details,
            ...offerRest
        } = orm;

        return {
            ...offerRest,
            details: details as Record<string, unknown>,
        };

    };

};