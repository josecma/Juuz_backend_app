import IDomainEvent from "../../domain/contracts/i.domain.event";
import DomainEvent from "../../domain/entities/domain.event";

export default interface IEventHandler<T extends DomainEvent = IDomainEvent> {
    handle(event: T): Promise<void>;
};