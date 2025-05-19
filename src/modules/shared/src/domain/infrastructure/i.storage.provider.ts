import File from "../file";

export default interface IStorageProvider {
    uploadFiles(files: File[]): Promise<Map<string, Record<string, any>>>;

    getFileUrls(keys: string[], expiresIn: number): Promise<Map<string, string>>;

    deleteFiles(keys: string[]): Promise<void>;
};