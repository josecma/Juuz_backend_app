import { Injectable } from "@nestjs/common";
import IEventDispatcher from "../application/contracts/i.event.dispatcher";
import IEventHandler from "../application/contracts/i.event.handler";
import IDomainEvent from "../domain/contracts/i.domain.event";

@Injectable({})
export class EventDispatcher implements IEventDispatcher {

    private handlers: Map<string, IEventHandler[]> = new Map();

    public register(eventName: string, handler: IEventHandler): void {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }
        this.handlers.get(eventName)?.push(handler);
    };

    public async dispatch(event: IDomainEvent): Promise<void> {
        const eventName = event.eventName();
        const handlers = this.handlers.get(eventName) || [];

        await Promise.all(
            handlers.map(handler => handler.handle(event))
        );
    };

};