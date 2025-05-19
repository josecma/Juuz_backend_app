import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
import CriterionSetRepository from "../../infrastructure/repositories/criterion.set.repository";
import CriterionSet from "../entities/criterion.set";

@Injectable({})
export default class FindOneCriterionSetByNameService {

    public constructor(
        @Inject(CriterionSetRepository)
        private readonly criterionSetRepository: CriterionSetRepository,
    ) { };

    public async find(
        params: {
            name: string;
        }
    ): Promise<CriterionSet> {

        const { name } = params;

        try {


            if (!name) {

                throw new BadRequestDomainException(
                    {
                        message: "name is required",
                        source: `${FindOneCriterionSetByNameService.name}`,
                    }
                );

            };

            const criterionSet = await this.criterionSetRepository.findOneBy({ name });

            if (!criterionSet) {

                throw new NotFoundException(`criterion set with name:${name} does not exists`);

            };

            return criterionSet;

        } catch (error) {

            if (error instanceof HttpException) {

                throw error;

            };

            throw new InternalServerErrorException(error);

        };

    };

};