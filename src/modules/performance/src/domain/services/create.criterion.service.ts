import { HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import CriterionRepository from "../../infrastructure/repositories/criterion.repository";
import Criterion from "../entities/criterion";
import { CriterionWithoutIdJSON } from "../types";

@Injectable({})
export default class CreateCriterionService {

    public constructor(
        @Inject(CriterionRepository)
        private readonly criterionRepository: CriterionRepository,
    ) { }

    public async create(
        params: CriterionWithoutIdJSON
    ): Promise<Criterion> {

        const { name, description } = params;

        try {

            const newCriterion = new Criterion(
                {
                    name,
                    description,
                }
            );

            const criterionRes = await this.criterionRepository.save(
                {
                    criterion: newCriterion
                }
            );

            return criterionRes;

        } catch (error) {

            if (error instanceof HttpException) {

                throw error;

            };

            throw new InternalServerErrorException(error);

        };

    };

};