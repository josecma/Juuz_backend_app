import { Injectable, Logger } from "@nestjs/common";
import VehicleReadRepository from "../../infrastructure/repositories/vehicle.read.repository";

@Injectable({})
export default class FindAllVehiclesUseCase {

    private readonly logger = new Logger(FindAllVehiclesUseCase.name);

    public constructor(
        private readonly vehicleReadRepository: VehicleReadRepository,
    ) { };

    public async execute() {

        try {

            const findAllVehiclesResponse = await this.vehicleReadRepository.findAll();

            return findAllVehiclesResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindAllVehiclesUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};