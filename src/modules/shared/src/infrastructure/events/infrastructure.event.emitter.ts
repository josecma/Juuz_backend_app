import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import SeedEvent from './seed.event';

@Injectable()
export class InfrastructureEventEmitter {

    public constructor(
        private readonly eventEmitter: EventEmitter2,
    ) { };

    public emitEvent(
        eventName: string
    ): void {

        this.eventEmitter.emit(
            'seed.completed',
            new SeedEvent(eventName)
        );

    };

};