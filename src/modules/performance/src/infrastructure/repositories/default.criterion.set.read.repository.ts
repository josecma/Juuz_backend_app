import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserRoleEnum } from "src/modules/user/src/domain/enums/user.role.enum";

@Injectable({})
export default class DefaultCriterionSetReadRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneBy(
        params: {
            userRole: UserRoleEnum;
        }
    ) {

        const { userRole } = params;

        try {

            const defaultCriterionSet = await this.client.defaultSetOfCriteriaPerUserRole.findUnique(
                {
                    where: {
                        userRole: userRole.toUpperCase()
                    }
                }
            );

            return defaultCriterionSet;

        } catch (error) {

            throw error;

        };

    };

};