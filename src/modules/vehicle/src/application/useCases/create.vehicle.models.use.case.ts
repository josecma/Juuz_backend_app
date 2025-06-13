import { Injectable, Logger } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import VehicleMakeModelRepository from "../../infrastructure/repositories/vehicle.make.model.repository";
import VehicleMakeRepository from "../../infrastructure/repositories/vehicle.make.repository";

@Injectable()
export default class CreateVehicleModelsUseCase {

    private readonly logger = new Logger(CreateVehicleModelsUseCase.name);

    public constructor(
        private readonly vehicleMakeModelRepository: VehicleMakeModelRepository,
        private readonly vehicleMakeRepository: VehicleMakeRepository,
    ) { };

    public async execute(
        params: {
            makeId: string,
            models: Array<{
                name: string,
                year: number,
            }>
        }
    ) {

        const {
            makeId,
            models,
        } = params;

        try {

            const findMakeByIdResponse = await this.vehicleMakeRepository.findOneById(makeId);

            if (findMakeByIdResponse == null) {

                throw new NotFoundDomainException(
                    {
                        message: "vehicle make not found"
                    }
                );
            };

            // const findModelsByMakeResponse = await this.vehicleMakeModelRepository.findByMake(make);

            // const filterModels = models.map(

            //     (newModel) => {

            //         const findModel = findModelsByMakeResponse.find(
            //             (oldModel) => newModel.name === oldModel.name
            //         )

            //         if (findModel) {

            //             if (!findModel.years.includes(newModel.year)) {

            //                 const { years, makeId, id, ...rest } = findModel;

            //                 return {
            //                     ...rest,
            //                     years: [...years, newModel.year]
            //                 }

            //             }

            //         };

            //         const { year, ...rest } = newModel;

            //         return {
            //             ...rest,
            //             makeId: findMakeByNameResponse.id,
            //             years: [year],
            //         };

            //     }
            // )

            await this.vehicleMakeModelRepository.save(
                {
                    makeId: findMakeByIdResponse.id,
                    models,
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${CreateVehicleModelsUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};