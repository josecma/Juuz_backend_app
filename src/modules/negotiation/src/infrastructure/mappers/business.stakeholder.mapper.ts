import { Prisma } from "@prisma/client";

export default class BusinessStakeholderMapper {

    static to(
        orm: Prisma.BusinessStakeholderGetPayload<{}>
    ) {

        const {
            businessId,
            details,
            ...stakeholderRest
        } = orm;

        return {
            ...stakeholderRest,
            details: details as Record<string, unknown>,
        };

    };

};