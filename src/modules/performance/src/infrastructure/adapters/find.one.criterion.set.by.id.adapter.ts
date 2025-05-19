import { Inject, Injectable } from "@nestjs/common";
import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
import FindOneCriterionSetByIdPort from "../../application/ports/find.one.criterion.set.by.id.port";
import CriterionSet from "../../domain/entities/criterion.set";
import CriterionSetRepository from "../repositories/criterion.set.repository";

@Injectable({})
export default class FindOneCriterionSetByIdAdapter implements FindOneCriterionSetByIdPort {

    public constructor(
        @Inject(CriterionSetRepository)
        private readonly criterionSetRepository: CriterionSetRepository,
    ) { };

    public async find(
        params: {
            criterionSetId: string;
        }
    ): Promise<CriterionSet | null> {

        const { criterionSetId } = params;

        try {

            if (!criterionSetId) {
                throw new BadRequestDomainException(
                    {
                        message: "criterion set id is required",
                        source: `${FindOneCriterionSetByIdAdapter.name}`
                    }
                );
            };

            const criterionSet = await this.criterionSetRepository.findOneBy(
                {
                    id: criterionSetId
                }
            );

            return criterionSet;

        } catch (error) {

            throw error;

        };

    };

};