import { Injectable, Logger } from "@nestjs/common";
import VehicleMakeRepository from "../../infrastructure/repositories/vehicle.make.repository";
import VehicleManufacturerRepository from "../../infrastructure/repositories/vehicle.manufacturer.repository";

@Injectable()
export default class CreateVehicleMakeUseCase {

    private readonly logger = new Logger(CreateVehicleMakeUseCase.name);

    public constructor(
        private readonly vehicleMakeRepository: VehicleMakeRepository,
        private readonly vehicleManufacturerRepository: VehicleManufacturerRepository,
    ) { };

    public async execute(
        params: {
            manufacturer: string,
            makes: Array<string>
        }
    ) {

        const {
            manufacturer,
            makes,
        } = params;

        try {

            const findOneManufacturerByName = await this.vehicleManufacturerRepository.findOneByName(manufacturer);

            await this.vehicleMakeRepository.save(
                {
                    manufacturerId: findOneManufacturerByName.id,
                    makes,
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${CreateVehicleMakeUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};