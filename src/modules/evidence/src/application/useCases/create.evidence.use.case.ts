import { Injectable } from "@nestjs/common";
import S3Adapter from "src/modules/shared/src/infrastructure/adapters/s3.adapter";
import { EvidenceType } from "../../domain/enums/evidence.type";
import CreateEvidenceService from "../../domain/services/create.evidence.service";
import { UploadFile } from "src/modules/shared/src/domain/types/upload.file";

@Injectable({})
export default class CreateEvidenceUseCase {

    public constructor(
        private readonly createEvidenceService: CreateEvidenceService,
        private readonly s3Adapter: S3Adapter,
    ) { };

    public async execute(
        params: {
            userId: string,
            orderId: string,
            description: string,
            type: EvidenceType,
            coordinates: {
                longitude: number,
                latitude: number,
            };
            files: UploadFile[],
        }
    ) {

        const {
            userId,
            orderId,
            type,
            description,
            coordinates,
            files,
        } = params;

        let uploadedFiles: Map<string, string> = new Map();

        try {

            uploadedFiles = await this.s3Adapter.uploadFiles(files);

            const fileData = files.map((file) => {

                const {
                    uniqueName,
                    mimeType,
                    metadata,
                    buffer,
                } = file;

                return {
                    uniqueName,
                    eTag: uploadedFiles.get(uniqueName),
                    mimeType,
                    metadata,
                    size: buffer.length,
                };

            });

            await this.createEvidenceService.create(
                Object.assign(
                    {},
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