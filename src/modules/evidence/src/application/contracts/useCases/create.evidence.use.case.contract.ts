import { EvidenceType } from "../../../domain/enums/evidence.type";

export default interface CreateEvidenceUseCaseContract {
    execute(
        params: {
            userId: string;
            orderId: string;
            description: string;
            type: EvidenceType,
            coordinates: {
                longitude: number;
                latitude: number;
            }; files: {
                fileName: string;
                key: string;
                buffer: Buffer;
                mimeType: string;
                metadata?: Record<string, any>;
            }[];
        }
    ): Promise<void>;
};