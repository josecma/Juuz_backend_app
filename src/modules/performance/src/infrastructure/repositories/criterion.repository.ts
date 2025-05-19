import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import Criterion from "../../domain/entities/criterion";
import CriterionMapper from "../mappers/criterion.mapper";

@Injectable({})
export default class CriterionRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async find(
        params?: {

        }
    ): Promise<Array<Criterion>> {
        try {

            const res = await this.client.criterion.findMany(
                {}
            );

            return res.map((e) => CriterionMapper.to({ orm: e }));

        } catch (error) {

            throw error;

        };
    };

    public async findSetById(
        params: {
            idSet: Set<string>;
        }
    ): Promise<Array<Criterion>> {
        try {

            const { idSet } = params;

            const res = await this.client.criterion.findMany(
                {
                    where: {
                        id: {
                            in: Array.from(idSet.values()).map((id) => Number(id))
                        }
                    },
                }
            );

            return res.map((e) => CriterionMapper.to({ orm: e }));

        } catch (error) {

            throw error;

        };
    };


    public async findOneBy(
        params: {
            id?: string;
            name?: string;
        }
    ): Promise<Criterion | null> {
        try {

            const { id, name } = params;

            const criterionWhereUniqueInput: Prisma.CriterionWhereUniqueInput = {
                ...(id && { id: Number(id) }),
                ...(name && { name }),
            };

            const res = await this.client.criterion.findUnique(
                {
                    where: criterionWhereUniqueInput,
                }
            );

            return res ? CriterionMapper.to({ orm: res }) : null;

        } catch (error) {

            throw error;

        };
    };

    public async save(
        params: {
            criterion: Criterion;
        }
    ): Promise<Criterion> {

        const { criterion } = params;

        const { id, ...criterionRes } = criterion.toJSON();

        try {

            const res = await this.client.criterion.create(
                {
                    data: criterionRes,
                }
            );

            return CriterionMapper.to(
                {
                    orm: res
                }
            );

        } catch (error) {

            throw error;

        };

    };

};