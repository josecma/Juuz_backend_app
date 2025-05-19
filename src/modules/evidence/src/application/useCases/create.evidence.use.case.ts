import { Inject, Injectable } from "@nestjs/common";
import IStoragePort from "src/modules/shared/src/application/ports/i.storage.port";
import S3Adapter from "src/modules/shared/src/infrastructure/adapters/s3.adapter";
import { EvidenceType } from "../../domain/enums/evidence.type";
import CreateEvidenceService from "../../domain/services/create.evidence.service";
import CreateEvidenceUseCaseContract from "../contracts/useCases/create.evidence.use.case.contract";

@Injectable({})
export default class CreateEvidenceUseCase implements CreateEvidenceUseCaseContract {

    public constructor(
        @Inject(CreateEvidenceService)
        private readonly createEvidenceService: CreateEvidenceService,
        @Inject(S3Adapter)
        private readonly s3Adapter: IStoragePort,
    ) { };

    public async execute(
        params: {
            userId: string;
            orderId: string;
            description: string;
            type: EvidenceType;
            coordinates: {
                longitude: number;
                latitude: number;
            };
            files: {
                fileName: string;
                key: string;
                buffer: Buffer;
                mimeType: string;
                metadata?: Record<string, any>;
            }[];
        }): Promise<void> {

        const { userId, orderId, type, description, coordinates, files } = params;

        const requiredParams: string[] = [];

        if (!userId) requiredParams.push("userId");
        if (!orderId) requiredParams.push("orderId");
        if (!type) requiredParams.push("type");
        if (!description) requiredParams.push("description");
        if (!coordinates) requiredParams.push("coordinates");
        if (!files) requiredParams.push("files");

        let uploadedFiles: Map<string, string> = new Map();

        try {

            if (requiredParams.length > 0) throw new Error(`${CreateEvidenceUseCase.name}Err: params ${requiredParams.join(",")} are required.`);

            uploadedFiles = await this.s3Adapter.uploadFiles(files);

            const fileData = files.map((file) => {

                const { key, mimeType, metadata, buffer, fileName } = file;

                return {
                    key: uploadedFiles.get(key),
                    mimeType,
                    metadata,
                    fileName,
                    size: buffer.length,
                };

            });

            await this.createEvidenceService.create(
                Object.assign(
                    { files: fileData },
                    { userId, orderId, type, description, coordinates }
                )
            );

        } catch (error) {

            if (uploadedFiles.size > 0) await this.s3Adapter.deleteFiles(
                Array.from(uploadedFiles.values())
            );

            throw error;

        };

    };

};