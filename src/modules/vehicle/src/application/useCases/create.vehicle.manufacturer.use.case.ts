import { Injectable, Logger } from "@nestjs/common";
import VehicleManufacturerRepository from "../../infrastructure/repositories/vehicle.manufacturer.repository";

@Injectable()
export default class CreateVehicleManufacturerUseCase {

    private readonly logger = new Logger(CreateVehicleManufacturerUseCase.name);

    public constructor(
        private readonly vehicleManufacturerRepository: VehicleManufacturerRepository,
    ) { };

    public async execute(
        manufacturers: Array<string>,
    ) {

        try {

            await this.vehicleManufacturerRepository.save(
                manufacturers
            );

            this.logger.log("manufacturers saved successfully");

        } catch (error) {

            this.logger.error(
                {
                    source: `${CreateVehicleManufacturerUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};