import { Injectable, Logger } from "@nestjs/common";
import VehicleMakeModelRepository from "../../infrastructure/repositories/vehicle.make.model.repository";

@Injectable({})
export default class FindVehicleModelsByMakeIdUseCase {

    private readonly logger = new Logger(FindVehicleModelsByMakeIdUseCase.name);

    public constructor(
        private readonly vehicleMakeModelRepository: VehicleMakeModelRepository,
    ) { };

    public async execute(
        makeId: string
    ) {

        try {

            const findModelsByMakeIdResponse = await this.vehicleMakeModelRepository.findByMakeId(makeId);

            return findModelsByMakeIdResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindVehicleModelsByMakeIdUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};