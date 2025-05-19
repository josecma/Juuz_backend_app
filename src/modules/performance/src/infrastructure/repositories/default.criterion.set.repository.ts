import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserRoleEnum } from "src/modules/user/src/domain/enums/user.role.enum";

@Injectable({})
export default class DefaultCriterionSetRepository {
    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async set(
        params: {
            criterionSetId: string;
            userRole: UserRoleEnum;
        }
    ) {

        const { criterionSetId, userRole } = params;

        try {

            const defaultCriterionSet = await this.client.defaultSetOfCriteriaPerUserRole.upsert(
                {
                    where: {
                        criterionSetId_userRole: {
                            criterionSetId: Number(criterionSetId),
                            userRole,
                        },
                    },
                    update: {
                        criterionSetId: Number(criterionSetId),
                        userRole,
                    },
                    create: {
                        criterionSetId: Number(criterionSetId),
                        userRole,
                    }
                }
            );

            return defaultCriterionSet;

        } catch (error) {

            throw error;

        };

    };

};