import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import RequiredParamException from "src/modules/shared/src/domain/exceptions/required.param.exception";
import CriterionSetRepository from "../../infrastructure/repositories/criterion.set.repository";
import CriterionSet from "../entities/criterion.set";

@Injectable({})
export default class FindOneCriterionSetByIdService {

    public constructor(
        @Inject(CriterionSetRepository)
        private readonly criterionSetRepository: CriterionSetRepository,
    ) { };

    public async find(
        params: {
            id: string;
        }
    ): Promise<CriterionSet> {

        const { id } = params;

        try {


            if (!id) {

                throw new RequiredParamException(
                    {
                        name: `${FindOneCriterionSetByIdService.name}Err`,
                        requiredParams: ["id"],
                    }
                );

            };

            const criterionSet = await this.criterionSetRepository.findOneBy({ id });

            if (!criterionSet) {

                throw new NotFoundException(`criterion set with id:${id} does not exists`);

            };

            return criterionSet;

        } catch (error) {

            throw error;

        };

    };

};