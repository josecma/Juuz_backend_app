export default interface IDomainEvent {
    eventName(): string;
    occurredAt: Date;
};