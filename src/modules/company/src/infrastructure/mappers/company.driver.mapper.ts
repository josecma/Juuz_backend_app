import { Prisma } from "@prisma/client";
import { IdentityEnum } from "src/modules/user/src/domain/enums/identity.enum";

export default class CompanyDriverMapper {

    static to(
        orm: Prisma.CompanyMemberGetPayload<{
            include: {
                member: {
                    include: {
                        identities: true,
                    }
                },
                driver: true,
            }
        }>
    ) {

        const {
            member,
            driver
        } = orm;

        const {
            identities,
            id,
            createdAt,
            verified,
            ...user
        } = member;

        const emails: Array<string> = [];

        identities.forEach(
            e => {
                if (e.type === IdentityEnum.EMAIL) {
                    emails.push(e.value)
                }
            }
        );

        return {
            ...user,
            ...driver,
            emails
        };

    };

};