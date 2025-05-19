import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { RoleType } from "src/modules/shared/src/domain/enums/role.type";

@Injectable({})
export default class CountUserReviewRepository {
    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async count(
        params: {
            userId: string;
            role: RoleType;
        }
    ) {

        const { userId, role } = params;

        try {

            const counter = await this.client.evaluation.count(
                {
                    where: {
                        AND: {
                            evaluatedId: Number(userId),
                            role: role.toString(),
                        },
                    }
                }
            );

            return counter;

        } catch (error) {

            throw error;

        };

    };

};