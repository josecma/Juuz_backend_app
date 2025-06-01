import { Injectable, Logger } from "@nestjs/common";
import S3Adapter from "src/modules/shared/src/infrastructure/adapters/s3.adapter";
import VehicleReadRepository from "../../infrastructure/repositories/vehicle.read.repository";
import VehicleWriteRepository from "../../infrastructure/repositories/vehicle.write.repository";

@Injectable({})
export default class DeleteOneVehicleByIdUseCase {

    private readonly logger = new Logger(DeleteOneVehicleByIdUseCase.name);

    public constructor(
        private readonly vehicleWriteRepository: VehicleWriteRepository,
        private readonly vehicleReadRepository: VehicleReadRepository,
        private readonly s3Adapter: S3Adapter,
    ) { };

    public async execute(
        vehicleId: string
    ) {

        try {

            const findOneByIdResponse = await this.vehicleReadRepository.findOneById(vehicleId);

            await this.vehicleWriteRepository.deleteOneById(vehicleId);

            this.s3Adapter.deleteFiles(
                findOneByIdResponse.pictures.map(
                    (e) => {
                        return e.key;
                    }
                )
            );

            this.logger.log(`vehicle with id: ${findOneByIdResponse.id} deleted successfully`);

        } catch (error) {

            this.logger.error(
                {
                    source: `${DeleteOneVehicleByIdUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};