import DomainEvent from "src/modules/shared/src/domain/entities/domain.event";
import Evaluation from "../entities/evaluation";

export default class UserEvaluationCreatedEvent extends DomainEvent {

    evaluatedId: string;
    evaluation: Evaluation;
    static readonly eventName = 'UserEvaluationCreatedEvent';

    public constructor(
        params: {
            evaluatedId: string,
            evaluation: Evaluation,
        }
    ) {

        const { evaluatedId, evaluation } = params;

        super();

        this.evaluatedId = evaluatedId;
        this.evaluation = evaluation;

    };

};