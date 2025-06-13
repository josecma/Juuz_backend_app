import { Injectable, Logger } from "@nestjs/common";
import VehicleTypeRepository from "../../infrastructure/repositories/vehicle.type.repository";

@Injectable({})
export default class FindVehicleTypesUseCase {

    private readonly logger = new Logger(FindVehicleTypesUseCase.name);

    public constructor(
        private readonly vehicleTypeRepository: VehicleTypeRepository,
    ) { };

    public async execute() {

        try {

            const findVehicleTypesResponse = await this.vehicleTypeRepository.find();

            return findVehicleTypesResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindVehicleTypesUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};