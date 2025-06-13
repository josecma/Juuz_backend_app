import { Injectable, Logger } from "@nestjs/common";
import VehicleTypeRepository from "../../infrastructure/repositories/vehicle.type.repository";

@Injectable()
export default class CreateVehicleTypeUseCase {

    private readonly logger = new Logger(CreateVehicleTypeUseCase.name);

    public constructor(
        private readonly vehicleTypeRepository: VehicleTypeRepository,
    ) { };

    public async execute(
        types: Array<string>
    ) {

        try {

            const findManyResponse = await this.vehicleTypeRepository.find();

            const filterData = types.filter(
                e => !findManyResponse.find(
                    type => type.name === e
                )
            );

            const createVehicleTypeResponse = await this.vehicleTypeRepository.save(
                filterData
            );

            return createVehicleTypeResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CreateVehicleTypeUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};