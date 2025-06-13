import { Injectable, Logger } from "@nestjs/common";
import VehicleMakeRepository from "../../infrastructure/repositories/vehicle.make.repository";

@Injectable({})
export default class FindVehicleMakesUseCase {

    private readonly logger = new Logger(FindVehicleMakesUseCase.name);

    public constructor(
        private readonly vehicleMakeRepository: VehicleMakeRepository,
    ) { };

    public async execute(
        params: {
            name?: string,
            year?: number,
        }
    ) {

        try {

            const findMakesResponse = await this.vehicleMakeRepository.find(params);

            return findMakesResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindVehicleMakesUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};