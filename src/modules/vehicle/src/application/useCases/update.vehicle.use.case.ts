import { Injectable, Logger } from "@nestjs/common";
import S3Adapter from "src/modules/shared/src/infrastructure/adapters/s3.adapter";
import VehicleReadRepository from "../../infrastructure/repositories/vehicle.read.repository";
import VehicleWriteRepository from "../../infrastructure/repositories/vehicle.write.repository";

@Injectable()
export default class UpdateVehicleUseCase {

    private readonly logger = new Logger(UpdateVehicleUseCase.name);

    public constructor(
        private readonly vehicleWriteRepository: VehicleWriteRepository,
        private readonly vehicleReadRepository: VehicleReadRepository,
        private readonly s3Adapter: S3Adapter,
    ) { };

    public async execute(
        params: {
            id: string,
            vehicle?: {
                vinNumber?: string,
                year?: number,
                vehicleType?: string,
                capacity?: number
            },
            fileIdsToDelete: Array<string>,
            modelId?: string,
            files?: Array<{
                fileName: string,
                key: string,
                buffer: Buffer,
                mimeType: string,
                metadata?: Record<string, unknown>,
            }>,
        }
    ) {

        const {
            id,
            vehicle,
            files,
            fileIdsToDelete,
            modelId
        } = params;

        let uploadedFiles: Map<string, string> = new Map();

        try {

            if (files.length > 0)
                uploadedFiles = await this.s3Adapter.uploadFiles(files);

            const pictures = files?.map((file) => {

                const {
                    key,
                    mimeType,
                    metadata,
                    buffer,
                    fileName
                } = file;

                return {
                    key,
                    eTag: uploadedFiles.get(key),
                    mimeType,
                    metadata,
                    fileName,
                    size: buffer.length,
                };

            });

            const findOneByIdResponse = await this.vehicleReadRepository.findOneById(id);

            const filesToDelete = findOneByIdResponse.pictures.filter(
                (e) => {

                    if (fileIdsToDelete.some((id) => id === e.id)) return e;

                }
            );

            await this.vehicleWriteRepository.update(
                {
                    id,
                    vehicle,
                    modelId,
                    fileIdsToDelete: fileIdsToDelete.length > 0 ? filesToDelete.map(e => e.id) : [],
                    pictures
                }
            );

            if (filesToDelete.length > 0) await this.s3Adapter.deleteFiles(
                filesToDelete?.map((e) => e.key)
            );

            const updatedVehicle = await this.vehicleReadRepository.findOneById(id);

            this.logger.log(`vehicle with id: ${updatedVehicle.id} updated successfully`);

            return updatedVehicle;

        } catch (error) {

            this.logger.error(
                {
                    source: `${UpdateVehicleUseCase.name}`,
                    message: error.message,
                }
            );

            if (uploadedFiles.size > 0) await this.s3Adapter.deleteFiles(
                Array.from(uploadedFiles.values())
            );

            throw error;

        };

    };

};