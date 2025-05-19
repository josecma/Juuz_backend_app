import Base from "./base";
import { FileJSON } from "./shared";

export default class File extends Base {

    key: string;
    mimeType: string;
    size: number;
    metadata?: Record<string, any>;

    public constructor(params: {
        id?: string;
        key: string;
        size: number;
        mimeType: string;
        metadata?: Record<string, any>;
    }) {

        const { id, key, mimeType, metadata, size } = params;

        super({ id });

        this.mimeType = mimeType;
        this.metadata = metadata ?? {};
        this.key = key;
        this.size = size;

    };

    public toJSON(): FileJSON {
        return {
            id: this.id,
            key: this.key,
            mimeType: this.mimeType,
            metadata: this.metadata,
            size: this.size,
        };
    };

};