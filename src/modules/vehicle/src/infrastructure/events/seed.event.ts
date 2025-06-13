
export default class SeedEvent {

    public constructor(
        public readonly eventName: string,
        public readonly timestamp: Date = new Date(),
    ) { };

};