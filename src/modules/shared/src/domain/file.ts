import Base from "./base";
import { FileJSON } from "./shared";

export default class File extends Base {

    key: string;
    eTag: string;
    mimeType: string;
    size: number;
    metadata?: Record<string, any>;

    public constructor(params: {
        id?: string;
        key: string;
        eTag: string;
        size: number;
        mimeType: string;
        metadata?: Record<string, any>;
    }) {

        const { id, key, mimeType, metadata, size, eTag } = params;

        super({ id });

        this.mimeType = mimeType;
        this.metadata = metadata ?? {};
        this.key = key;
        this.size = size;
        this.eTag = eTag;

    };

    public toJSON(): FileJSON {
        return {
            id: this.id,
            key: this.key,
            eTag: this.eTag,
            mimeType: this.mimeType,
            metadata: this.metadata,
            size: this.size,
        };
    };

};