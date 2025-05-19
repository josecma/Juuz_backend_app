import IDomainEvent from "../contracts/i.domain.event";

export default abstract class DomainEvent implements IDomainEvent {

    static readonly eventName: string;
    readonly occurredAt: Date = new Date();

    public eventName(): string {

        return (this.constructor as typeof DomainEvent).eventName;

    };

};