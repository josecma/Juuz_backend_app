import { Prisma } from "@prisma/client";

export default class BusinessMapper {

    static to(
        orm: Prisma.BusinessGetPayload<
            {
                include: {
                    stakeholders: true,
                    objects: true,
                    offers: true,
                }
            }
        >
    ) {

        const {
            offers,
            objects,
            stakeholders,
            ...businessRest
        } = orm;

        return {
            ...businessRest,
            offers: offers.map(o => o as Omit<typeof o, "details"> & { details: Record<string, unknown> }),
            objects: objects.map(o => o as Omit<typeof o, "details"> & { details: Record<string, unknown> }),
            stakeholders: stakeholders.map(s => s as Omit<typeof s, "details"> & { details: Record<string, unknown> }),
        };

    };

};