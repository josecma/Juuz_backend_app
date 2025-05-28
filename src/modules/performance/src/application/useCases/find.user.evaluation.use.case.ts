import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RoleType } from "src/modules/shared/src/domain/enums/role.type";
import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
import { UserEvaluation } from "../../domain/types";
import AverageEvaluationByCriterionRepository from "../../infrastructure/repositories/average.evaluation.by.criterion.repository";
import AverageEvaluationByRoleRepository from "../../infrastructure/repositories/average.evaluation.by.role.repository";
import CountUserReviewRepository from "../../infrastructure/repositories/count.user.review.repository";
import EvaluationRepository from "../../infrastructure/repositories/evaluation.repository";

@Injectable({})
export default class FindUserEvaluationUseCase {

    public constructor(
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
        @Inject(CountUserReviewRepository)
        private readonly countUserReviewRepository: CountUserReviewRepository,
        @Inject(AverageEvaluationByRoleRepository)
        private readonly averageEvaluationByRoleRepository: AverageEvaluationByRoleRepository,
        @Inject(AverageEvaluationByCriterionRepository)
        private readonly averageEvaluationByCriterionRepository: AverageEvaluationByCriterionRepository,
    ) { };

    public async find(
        params: {
            userId: string;
            role: RoleType;
        }
    ) {

        const { userId, role } = params;

        try {

            const user = await this.findOneUserByIdService.find(
                {
                    id: userId,
                }
            );

            const reviewCounter = await this.countUserReviewRepository.count(
                {
                    userId,
                    role,
                }
            );

            if (reviewCounter === 0) {

                throw new NotFoundException("evaluation not found");

            };

            const averageEvaluationByRole = await this.averageEvaluationByRoleRepository.find({ userId, role });

            const averageEvaluationByCriterion = await this.averageEvaluationByCriterionRepository.find({ userId, role });

            const userWithAvgByRoleAndAvgCriterion = {
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                evaluation: {
                    avg: averageEvaluationByRole.avg,
                    criteria: averageEvaluationByCriterion.criteria,
                },
            };

            return userWithAvgByRoleAndAvgCriterion;

        } catch (error) {

            throw error;

        };

    };

};