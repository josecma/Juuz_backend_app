import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class VehicleReadRepository {

    private readonly logger = new Logger(VehicleReadRepository.name);

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async findByOwnerId(
        ownerId: string,
    ) {

        try {

            const vehicles = await this.client.driver.findMany(
                {
                    where: {
                        ownerId,
                    },
                    include: {
                        vehicleInfo: {
                            include: {
                                model: {
                                    include: {
                                        brand: true,
                                    }
                                }
                            }
                        }
                    }
                }
            );

            return vehicles;

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

};