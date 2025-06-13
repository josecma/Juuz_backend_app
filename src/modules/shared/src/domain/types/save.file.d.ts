export type SaveFile = {
    uniqueName: string,
    eTag: string,
    size: number,
    mimeType: string,
    metadata?: Record<string, any>,
};