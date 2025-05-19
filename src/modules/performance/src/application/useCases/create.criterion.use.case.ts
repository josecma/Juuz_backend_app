import { Inject, Injectable } from "@nestjs/common";
import DuplicateKeyException from "src/modules/shared/src/domain/exceptions/duplicate.key.exception";
import Criterion from "../../domain/entities/criterion";
import { CriterionJSON } from "../../domain/types";
import CriterionRepository from "../../infrastructure/repositories/criterion.repository";

@Injectable({})
export default class CreateCriterionUseCase {

    public constructor(
        @Inject(CriterionRepository)
        private readonly criterionRepository: CriterionRepository,
    ) { };

    public async execute(
        params: {
            name: string;
            description?: string;
        }
    ): Promise<{
        msg: string;
        content: CriterionJSON;
    }> {

        const { name, description } = params;

        try {

            const newCriterion = new Criterion(
                {
                    name,
                    description,
                }
            );

            const findOneByName = await this.criterionRepository.findOneBy({ name: newCriterion.name });

            if (findOneByName) {
                throw new DuplicateKeyException({
                    entityName: "Criterion",
                    keyName: "name",
                    keyValue: `${name}`,
                });
            };

            const criterionRes = await this.criterionRepository.save(
                {
                    criterion: newCriterion
                }
            );

            return {
                msg: `criterion created successfully`,
                content: criterionRes.toJSON(),
            };

        } catch (error) {

            throw error;

        };

    };

};