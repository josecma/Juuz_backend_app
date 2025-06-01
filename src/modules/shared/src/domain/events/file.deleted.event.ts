import DomainEvent from "../entities/domain.event";

export default class FileDeletedEvent extends DomainEvent {

    readonly fileKeys: Array<string>;
    readonly occurredAt: Date;
    static readonly eventName = 'file.deleted';

    public constructor(
        params: {
            fileKeys: Array<string>,
            occurredAt: Date;
        }
    ) {

        const {
            fileKeys,
            occurredAt
        } = params;

        super();

        this.fileKeys = fileKeys;
        this.occurredAt = occurredAt;

    };

};