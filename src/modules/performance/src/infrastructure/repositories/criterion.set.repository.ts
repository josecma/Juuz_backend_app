import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import CriterionSet from "../../domain/entities/criterion.set";
import CriterionSetMapper from "../mappers/criterion.set.mapper";

@Injectable({})
export default class CriterionSetRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneBy(
        params: {
            id?: string;
            name?: string;
        }
    ): Promise<CriterionSet | null> {
        try {

            const { id, name } = params;

            const criterionSetWhereUniqueInput: Prisma.CriterionSetWhereUniqueInput = {
                ...(id && { id: id }),
                ...(name && { name }),
            };

            const res = await this.client.criterionSet.findUnique(
                {
                    where: criterionSetWhereUniqueInput,
                    include: {
                        criteria: {
                            include: {
                                criterion: true,
                            }
                        }
                    }
                }
            );

            return res ? CriterionSetMapper.to({ orm: res }) : null;

        } catch (error) {

            throw error;

        };
    };

    public async find(
        params?: {

        }
    ): Promise<Array<CriterionSet>> {
        try {

            const res = await this.client.criterionSet.findMany(
                {
                    include: {
                        criteria: {
                            include: {
                                criterion: true,
                            }
                        }
                    }
                }
            );

            return res.map((e) => CriterionSetMapper.to({ orm: e }));

        } catch (error) {

            throw error;

        };
    };

    public async save(
        params: {
            criterionSet: CriterionSet;
            criteria: Array<[number, string]>;
        }
    ): Promise<CriterionSet> {

        const { criterionSet, criteria } = params;

        const { name, description, version } = criterionSet.toJSON();

        try {

            const res = await this.client.$transaction(async (tx) => {
                const criterionSet = await tx.criterionSet.create(
                    {
                        data: {
                            name,
                            description,
                            version,
                        }
                    }
                );

                await tx.criterionMembership.createMany(
                    {
                        data: criteria.map(([order, id]) => {
                            return {
                                setId: criterionSet.id,
                                criterionId: id,
                                order,
                            }
                        })
                    }
                );

                return await tx.criterionSet.findUnique(
                    {
                        where: {
                            id: criterionSet.id
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

            });

            return CriterionSetMapper.to({ orm: res });

        } catch (error) {

            throw error;

        };

    };

};