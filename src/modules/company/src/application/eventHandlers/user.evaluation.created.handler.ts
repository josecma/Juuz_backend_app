import { Inject, Injectable } from "@nestjs/common";
import UserEvaluationCreatedEvent from "src/modules/performance/src/domain/events/user.evaluation.created.event";
import IEventHandler from "src/modules/shared/src/application/contracts/i.event.handler";
import UserCompanyRepository from "src/modules/user/src/infrastructure/repositories/user.company.repository";
import UpdateCompanyScoreService from "../../domain/services/update.company.score.service";

@Injectable({})
export default class UserEvaluationCreatedHandler implements IEventHandler<UserEvaluationCreatedEvent> {

    public constructor(
        @Inject(UpdateCompanyScoreService)
        private readonly updateCompanyScoreService: UpdateCompanyScoreService,
        @Inject(UserCompanyRepository)
        private readonly userCompanyRepository: UserCompanyRepository,
    ) { };

    public async handle(event: UserEvaluationCreatedEvent): Promise<void> {

        const { evaluatedId, evaluation } = event;

        try {

            const userCompany = await this.userCompanyRepository.findUserCompanyByUserId(
                {
                    userId: evaluatedId,
                }
            );

            const newScoreSum = evaluation.scores.reduce(
                (sum, score) => {
                    return sum + score.value || 0;
                },
                0
            );

            await Promise.all(
                userCompany.map(
                    async (e) => {
                        await this.updateCompanyScoreService.update(
                            {
                                companyId: e.id.toString(),
                                score: newScoreSum / evaluation.scores.length,
                            }
                        );
                    }
                )
            );

        } catch (error) {

            throw error;

        }

    };

};
