export default class Identity {

    private _id: string;
    private _type: string;
    private _value: string;
    private _verified: boolean;
    private _metadata?: Record<string, unknown>;

    public constructor(params: {
        id: string;
        type: string;
        value: string;
        verified: boolean;
        metadata?: Record<string, unknown>;
    }) {

        const { id, type, value, verified, metadata } = params;
        this._id = id;
        this._type = type;
        this._value = value;
        this._verified = verified;
        this._metadata = metadata;

    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get type(): string {
        return this._type;
    }

    public set type(value: string) {
        this._type = value;
    }

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this._value = value;
    }

    public get verified(): boolean {
        return this._verified;
    }

    public set verified(value: boolean) {
        this._verified = value;
    }

    public get metadata(): Record<string, unknown> | undefined {
        return this._metadata;
    }

    public set metadata(value: Record<string, unknown> | undefined) {
        this._metadata = value;
    }

    public toJSON(): {
        id: string;
        type: string;
        value: string;
        verified: boolean;
        metadata?: Record<string, unknown>;
    } {
        return {
            id: this._id,
            type: this._type,
            value: this._value,
            verified: this._verified,
            ...(this._metadata && { metadata: this._metadata }),
        };
    }

};