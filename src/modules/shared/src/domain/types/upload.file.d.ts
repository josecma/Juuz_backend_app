export type UploadFile = {
    uniqueName: string,
    originalName: string,
    buffer: Buffer,
    mimeType: string,
    metadata?: Record<string, any>,
};