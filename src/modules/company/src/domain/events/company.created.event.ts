import DomainEvent from "src/modules/shared/src/domain/entities/domain.event";

export default class CompanyCreatedEvent extends DomainEvent {

    readonly ownerId: string;
    readonly company: any;
    readonly occurredAt: Date;
    static readonly eventName = 'company.created';

    public constructor(
        params: {
            ownerId: string,
            company: string,
            occurredAt: Date,
        }
    ) {

        const {
            ownerId,
            company,
            occurredAt
        } = params;

        super();

        this.ownerId = ownerId;
        this.company = company;
        this.occurredAt = occurredAt;

    };

};