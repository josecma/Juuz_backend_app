import { Inject, Injectable, Logger } from "@nestjs/common";
import IEventDispatcher from "src/modules/shared/src/application/contracts/i.event.dispatcher";
import S3Adapter from "src/modules/shared/src/infrastructure/adapters/s3.adapter";
import { EventDispatcher } from "src/modules/shared/src/infrastructure/event.dispatcher";
import VehicleWriteRepository from "../../infrastructure/repositories/vehicle.write.repository";

@Injectable()
export default class CreateVehicleUseCase {

    private readonly logger = new Logger(CreateVehicleUseCase.name);

    public constructor(
        private readonly vehicleWriteRepository: VehicleWriteRepository,
        private readonly s3Adapter: S3Adapter,
        @Inject(EventDispatcher)
        private readonly eventDispatcher: IEventDispatcher,
    ) { };

    public async execute(
        params: {
            ownerId: string,
            vehicle: {
                vinNumber: string,
                year: number,
                vehicleType: string,
                capacity: number
            },
            modelId: string,
            files: Array<{
                fileName: string,
                key: string,
                buffer: Buffer,
                mimeType: string,
                metadata?: Record<string, unknown>,
            }>,
        }
    ) {

        const {
            ownerId,
            vehicle,
            files,
            modelId
        } = params;

        let uploadedFiles: Map<string, string> = new Map();

        try {

            uploadedFiles = await this.s3Adapter.uploadFiles(files);

            const pictures = files.map((file) => {

                const { key, mimeType, metadata, buffer, fileName } = file;

                return {
                    key,
                    eTag: uploadedFiles.get(key),
                    mimeType,
                    metadata,
                    fileName,
                    size: buffer.length,
                };

            });

            const createVehicleRes = await this.vehicleWriteRepository.save(
                {
                    ownerId,
                    vehicle,
                    modelId,
                    pictures
                }
            );

            return createVehicleRes;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CreateVehicleUseCase.name}`,
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