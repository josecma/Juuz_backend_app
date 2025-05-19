import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import RequiredParamException from "src/modules/shared/src/domain/exceptions/required.param.exception";
import CriterionRepository from "../../infrastructure/repositories/criterion.repository";
import Criterion from "../entities/criterion";

@Injectable({})
export default class FindOneCriterionByNameService {

    public constructor(
        @Inject(CriterionRepository)
        private readonly criterionRepository: CriterionRepository,
    ) { };

    public async find(
        params: {
            name: string;
        }
    ): Promise<Criterion> {

        const { name } = params;

        try {


            if (!name) {

                throw new RequiredParamException(
                    {
                        name: `${FindOneCriterionByNameService.name}Err`,
                        requiredParams: ["name"],
                    }
                );

            };

            const criterion = await this.criterionRepository.findOneBy({ name });

            if (!criterion) {

                throw new NotFoundException(`criterion with name:${name} does not exists`);

            };

            return criterion;

        } catch (error) {

            if (error instanceof HttpException) {

                throw error;

            };

            throw new InternalServerErrorException(error);

        };

    };

};