import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import CriterionSetMapper from "../mappers/criterion.set.mapper";

@Injectable({})
export default class CriterionSetLatestVersionRepository {
    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async find(
        params: {
            name: string;
        }
    ) {

        const { name } = params;

        try {

            const criterionSet = await this.client.criterionSet.findFirst(
                {
                    where: {
                        name,
                    },
                    orderBy: {
                        version: "desc",
                    },
                    include: {
                        criteria: {
                            include: {
                                criterion: true,
                            }
                        }
                    }
                }
            );

            return criterionSet ? CriterionSetMapper.to({ orm: criterionSet }) : null;

        } catch (error) {

            throw error;

        };

    };

};