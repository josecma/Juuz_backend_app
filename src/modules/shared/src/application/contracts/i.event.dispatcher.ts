import IDomainEvent from "../../domain/contracts/i.domain.event";
import IEventHandler from "./i.event.handler";

export default interface IEventDispatcher {
    register(eventName: string, handler: IEventHandler): void;
    dispatch(event: IDomainEvent): Promise<void>;
};