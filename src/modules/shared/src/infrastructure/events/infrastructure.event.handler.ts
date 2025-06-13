// import { Injectable } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';

// @Injectable()
// export class InfrastructureEventHandler {

//     public constructor(
//         private readonly eventEmitter: EventEmitter2 = new EventEmitter2(),
//     ) { };

//     public handle<T>(
//         eventName: string,
//         eventHandler: (event: T) => void
//     ): void {

//         this.eventEmitter.on(
//             'seed.completed',
//             eventHandler,
//         );

//     };

// };