import DomainEvent from "src/modules/shared/src/domain/entities/domain.event";
import { BusinessStakeholder } from "../types/business.stakeholder";

export default class StakeholderStatusChangedEvent extends DomainEvent {

    readonly changedBy: string;
    readonly businessId: string;
    readonly stakeholders: Array<BusinessStakeholder<any>>;
    readonly occurredAt: Date;
    static readonly eventName = 'stakeholder.status.changed';

    public constructor(
        params: {
            businessId: string,
            changedBy: string,
            stakeholders: Array<BusinessStakeholder<any>>,
            occurredAt: Date;
        }
    ) {

        const {
            businessId,
            changedBy,
            stakeholders,
            occurredAt
        } = params;

        super();

        this.changedBy = changedBy;
        this.stakeholders = stakeholders;
        this.businessId = businessId;
        this.occurredAt = occurredAt;

    };

};