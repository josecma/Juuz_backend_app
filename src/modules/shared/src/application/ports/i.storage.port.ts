
export default interface IStoragePort {

    uploadFiles(
        files: {
            fileName: string;
            key: string;
            buffer: Buffer;
            mimeType: string;
            metadata?: Record<string, any>;
        }[]
    ): Promise<Map<string, string>>;

    getFileUrls(
        params: {
            keys: string[];
            expiresIn?: number;
        }
    ): Promise<Map<string, string>>;

    deleteFiles(
        keys: string[]
    ): Promise<void>;

};