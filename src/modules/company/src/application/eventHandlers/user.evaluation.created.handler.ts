import { Inject, Injectable } from "@nestjs/common";
import UserEvaluationCreatedEvent from "src/modules/performance/src/domain/events/user.evaluation.created.event";
import IEventHandler from "src/modules/shared/src/application/contracts/i.event.handler";
import UpdateCompanyScoreService from "../../domain/services/update.company.score.service";
import FindCompanyByOwnerIdUseCase from "../useCases/find.company.by.owner.use.case";

@Injectable({})
export default class UserEvaluationCreatedHandler implements IEventHandler<UserEvaluationCreatedEvent> {

    public constructor(
        @Inject(UpdateCompanyScoreService)
        private readonly updateCompanyScoreService: UpdateCompanyScoreService,
        @Inject(FindCompanyByOwnerIdUseCase)
        private readonly findCompanyByOwnerIdUseCase: FindCompanyByOwnerIdUseCase,
    ) { };

    public async handle(
        event: UserEvaluationCreatedEvent,
    ): Promise<void> {

        const {
            evaluatedId,
            evaluation,
        } = event;

        try {

            const userCompany = await this.findCompanyByOwnerIdUseCase.execute(
                evaluatedId
            );

            const newScoreSum = evaluation.scores.reduce(
                (sum, score) => {
                    return sum + score.value || 0;
                },
                0
            );

            await this.updateCompanyScoreService.update(
                {
                    companyId: userCompany.id.toString(),
                    score: newScoreSum / evaluation.scores.length,
                }
            );

        } catch (error) {

            throw error;

        }

    };

};
