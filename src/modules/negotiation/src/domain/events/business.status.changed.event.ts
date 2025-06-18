import DomainEvent from "src/modules/shared/src/domain/entities/domain.event";

export default class BusinessStatusChangedEvent extends DomainEvent {

    readonly businessId: string;
    readonly status: string;
    readonly occurredAt: Date;
    static readonly eventName = 'BusinessStatusChangedEvent';

    public constructor(
        params: {
            businessId: string,
            status: string,
            occurredAt: Date,
        }
    ) {

        const {
            businessId,
            status,
            occurredAt
        } = params;

        super();

        this.status = status;
        this.businessId = businessId;
        this.occurredAt = occurredAt;

    };

};