import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class VehicleManufacturerRepository {

    private readonly logger = new Logger(VehicleManufacturerRepository.name);

    public constructor(
        private readonly client: PrismaClient,
    ) { };

    public async save(
        manufacturers: Array<string>,
    ) {

        try {

            await this.client.vehicleManufacturer.createMany(
                {
                    data: manufacturers.map(
                        (manufacturer) => {
                            return {
                                name: manufacturer
                            }
                        }
                    ),
                    skipDuplicates: true,
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleManufacturerRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async find() {

        try {

            const findManyManufacturersResponse = await this.client.vehicleManufacturer.findMany({});

            return findManyManufacturersResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleManufacturerRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findOneByName(
        name: string
    ) {

        try {

            const findOneByNameResponse = await this.client.vehicleManufacturer.findUnique(
                {
                    where: {
                        name,
                    }
                }
            );

            return findOneByNameResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleManufacturerRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};