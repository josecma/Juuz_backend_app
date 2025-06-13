import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class VehicleTypeRepository {

    private readonly logger = new Logger(VehicleTypeRepository.name);

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async save(
        data: Array<string>
    ) {

        try {

            const createManyResponse = await this.client.vehicleType.createMany(
                {
                    data: data.map(
                        e => { return { name: e } }
                    )
                }
            );

            return createManyResponse.count;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleTypeRepository.name}`,
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

            const findUniqueResponse = await this.client.vehicleType.findUnique(
                {
                    where: {
                        name,
                    }
                }
            );

            return findUniqueResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleTypeRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async find() {

        try {

            const findManyResponse = await this.client.vehicleType.findMany(
                {

                }
            );

            return findManyResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleTypeRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};