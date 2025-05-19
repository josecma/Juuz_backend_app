import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import { EventDispatcher } from "src/modules/shared/src/infrastructure/event.dispatcher";
import { UserRoleEnum } from "src/modules/user/src/domain/enums/user.role.enum";
import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
import Evaluation from "../../domain/entities/evaluation";
import { Score } from "../../domain/entities/score";
import UserEvaluationCreatedEvent from "../../domain/events/user.evaluation.created.event";
import CriterionSetRepository from "../../infrastructure/repositories/criterion.set.repository";
import DefaultCriterionSetReadRepository from "../../infrastructure/repositories/default.criterion.set.read.repository";
import EvaluationRepository from "../../infrastructure/repositories/evaluation.repository";

@Injectable({})
export default class CreateEvaluationUseCase {

    public constructor(
        @Inject(CriterionSetRepository)
        private readonly criterionSetRepository: CriterionSetRepository,
        @Inject(DefaultCriterionSetReadRepository)
        private readonly defaultCriterionSetReadRepository: DefaultCriterionSetReadRepository,
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
        @Inject(EvaluationRepository)
        private readonly evaluationRepository: EvaluationRepository,
        @Inject(EventDispatcher)
        private readonly eventDispatcher: EventDispatcher,
    ) { }

    public async execute(
        params: {
            evaluatedId: string;
            evaluatorId: string;
            evaluation: {
                role: UserRoleEnum,
                scores: Array<{
                    id: string;
                    value: number;
                    comment?: string;
                }>;
            }
        }
    ) {

        const { evaluatedId, evaluatorId, evaluation } = params;

        const { scores, role } = evaluation;

        try {

            const defaultCriterionSet = await this.defaultCriterionSetReadRepository.findOneBy(
                {
                    userRole: role,
                }
            );

            if (!defaultCriterionSet) {
                throw new NotFoundDomainException(
                    {
                        message: `${role} default criterion set not found`,
                        source: `${CreateEvaluationUseCase.name}`
                    }
                );
            };

            const criterionSet = await this.criterionSetRepository.findOneBy(
                {
                    id: defaultCriterionSet.criterionSetId.toString(),
                }
            );

            await this.findOneUserByIdService.find(
                {
                    id: evaluatedId,
                }
            );

            await this.findOneUserByIdService.find(
                {
                    id: evaluatorId,
                }
            );

            const newScores = scores.map((s) => {

                const { value, comment } = s;

                const criterion = criterionSet.criteria.find((cSet) => cSet[1].id == s.id);

                if (criterion) {
                    return new Score(
                        {
                            id: criterion[1].id,
                            name: criterion[1].name,
                            value,
                            comment,
                        }
                    );
                };

            });

            if (newScores.length !== criterionSet.criteria.length) {
                throw new BadRequestException("The number of scores is unequal to the number of criteria in the set.");
            };

            const newEvaluation = new Evaluation(
                {
                    role,
                    scores: newScores,
                }
            );

            const evaluation = await this.evaluationRepository.save(
                {
                    criterionSetId: criterionSet.id,
                    evaluatedId,
                    evaluatorId,
                    evaluation: newEvaluation,
                }
            );

            const newUserEvaluationCreatedEvent = new UserEvaluationCreatedEvent(
                {
                    evaluatedId,
                    evaluation,
                }
            );

            this.eventDispatcher.dispatch(newUserEvaluationCreatedEvent);

            return {
                msg: `evaluation created successfully`,
                content: evaluation.toJSON(),
            };

        } catch (error) {

            throw error;

        };

    };

};