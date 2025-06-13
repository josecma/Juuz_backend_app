
export type VehicleItem = {
    year: number,
    status: string,
    trailerType: string,
    color: string,
    isTheKeysWithTheVehicle?: boolean,
    type: string,
    modelId: string,
    information?: string,
    wideLoad: boolean,
    pictures: Array<
        {
            uniqueName: string,
            mimeType: string,
            originalName: string,
            buffer: Buffer,
            metadata?: Record<string, any>,
        }
    >,
};