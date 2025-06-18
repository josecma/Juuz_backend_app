import DomainEvent from "src/modules/shared/src/domain/entities/domain.event";
import { BusinessStakeholderStatusEnum } from "../enums/business.stakeholder.status.enum";
import { BusinessStakeholder } from "../types/business.stakeholder";

export default class StakeholderStatusChangedEvent extends DomainEvent {

    readonly changedBy: string;
    readonly businessId: string;
    readonly stakeholders: Array<BusinessStakeholder<any>>;
    readonly occurredAt: Date;
    readonly status: BusinessStakeholderStatusEnum;
    static readonly eventName = 'stakeholder.status.changed';

    public constructor(
        params: {
            businessId: string,
            changedBy: string,
            status: BusinessStakeholderStatusEnum,
            stakeholders: Array<BusinessStakeholder<any>>,
            occurredAt: Date;
        }
    ) {

        const {
            businessId,
            changedBy,
            status,
            stakeholders,
            occurredAt
        } = params;

        super();

        this.changedBy = changedBy;
        this.stakeholders = stakeholders;
        this.businessId = businessId;
        this.status = status;
        this.occurredAt = occurredAt;

    };

};