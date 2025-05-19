import DomainEvent from "src/modules/shared/src/domain/entities/domain.event";
import { EvidenceType } from "../enums/evidence.type";

export default class EvidenceCreatedEvent extends DomainEvent {

    readonly orderId: string;
    readonly userId: string;
    readonly type: EvidenceType;
    readonly occurredAt: Date;
    static readonly eventName = 'EvidenceCreatedEvent';

    public constructor(
        params: {
            orderId: string,
            userId: string,
            type: EvidenceType,
            occurredAt: Date;
        }
    ) {

        const { orderId, userId, type, occurredAt } = params;

        super();

        this.orderId = orderId;
        this.userId = userId;
        this.type = type;
        this.occurredAt = occurredAt;

    };

};