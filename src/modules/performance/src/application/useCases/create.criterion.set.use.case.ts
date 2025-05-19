import { Inject, Injectable } from "@nestjs/common";
import CriterionSet from "../../domain/entities/criterion.set";
import CriterionRepository from "../../infrastructure/repositories/criterion.repository";
import CriterionSetLatestVersionRepository from "../../infrastructure/repositories/criterion.set.latest.version.repository";
import CriterionSetRepository from "../../infrastructure/repositories/criterion.set.repository";

@Injectable({})
export default class CreateCriterionSetUseCase {

    public constructor(
        @Inject(CriterionSetRepository)
        private readonly criterionSetRepository: CriterionSetRepository,
        @Inject(CriterionRepository)
        private readonly criterionRepository: CriterionRepository,
        @Inject(CriterionSetLatestVersionRepository)
        private readonly criterionSetLatestVersionRepository: CriterionSetLatestVersionRepository,
    ) { };

    public async execute(
        params: {
            name: string;
            description?: string;
            criteria: Array<[number, string]>;
        }
    ) {

        const { name, description, criteria } = params;

        try {

            const criterionSetLatestVersion = await this.criterionSetLatestVersionRepository.find(
                {
                    name: name.toUpperCase(),
                }
            );

            const newCriterionSet = new CriterionSet(
                {
                    name,
                    description,
                    version: criterionSetLatestVersion ? criterionSetLatestVersion.version + 1 : 1,
                }
            );

            const criterionSet = await this.criterionRepository.findSetById(
                {
                    idSet: new Set(criteria.map(([order, id]) => id)),
                }
            );

            const criteriaFilter = criteria.filter(([order, id]) => criterionSet.some((e) => e.id === id));

            const criterionSetRes = await this.criterionSetRepository.save(
                {
                    criterionSet: newCriterionSet,
                    criteria: criteriaFilter
                }
            );

            return {
                msg: `criterion set created successfully`,
                content: criterionSetRes.toJSON(),
            };

        } catch (error) {

            throw error;

        };

    };

};