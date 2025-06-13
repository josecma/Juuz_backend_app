import { Injectable, Logger } from "@nestjs/common";
import VehicleMakeModelRepository from "../../infrastructure/repositories/vehicle.make.model.repository";

@Injectable({})
export default class FindModelsByMakeIdAndYearUseCase {

    private readonly logger = new Logger(FindModelsByMakeIdAndYearUseCase.name);

    public constructor(
        private readonly vehicleMakeModelRepository: VehicleMakeModelRepository,
    ) { };

    public async execute(
        params: {
            makeId: string,
            year: number,
        }
    ) {

        const {
            makeId,
            year,
        } = params;

        try {

            const findModelsByMakeIdAndYearResponse = await this.vehicleMakeModelRepository.findByMakeIdAndYear(
                {
                    makeId,
                    year,
                }
            );

            return findModelsByMakeIdAndYearResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindModelsByMakeIdAndYearUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};