import DomainEvent from "src/modules/shared/src/domain/entities/domain.event";
import { BusinessStakeholder } from "../types/business.stakeholder";

export default class BusinessLeavedEvent extends DomainEvent {

    readonly leavedBy: string;
    readonly businessId: string;
    readonly stakeholders: Array<BusinessStakeholder<any>>;
    readonly occurredAt: Date;
    static readonly eventName = 'business.leaved';

    public constructor(
        params: {
            businessId: string,
            leavedBy: string,
            stakeholders: Array<BusinessStakeholder<any>>,
            occurredAt: Date;
        }
    ) {

        const {
            businessId,
            leavedBy,
            stakeholders,
            occurredAt
        } = params;

        super();

        this.leavedBy = leavedBy;
        this.stakeholders = stakeholders;
        this.businessId = businessId;
        this.occurredAt = occurredAt;

    };

};