import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class UserVehicleRepository {

    private readonly logger = new Logger(UserVehicleRepository.name);

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async findUserVehicleByUserId(
        params: {
            userId: string;
        },
    ) {

        const { userId } = params;

        try {

            const userVehicles = await this.client.user.findUnique(
                {
                    where: {
                        id: Number(userId),
                    },
                    include: {
                        driver: {
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
                        },

                    },
                }
            );

            return userVehicles.driver.map(
                (e) => e
            );

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

};