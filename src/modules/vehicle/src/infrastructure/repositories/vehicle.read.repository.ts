import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import VehicleMapper from "../mappers/vehicle.mapper";

@Injectable({})
export default class VehicleReadRepository {

    private readonly logger = new Logger(VehicleReadRepository.name);

    public constructor(
        private readonly client: PrismaClient,
    ) { };

    public async findAll() {

        try {

            const findManyVehiclesResponse = await this.client.vehicle.findMany(
                {
                    include: {
                        pictures: {
                            include: {
                                file: true,
                            }
                        },
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

            return findManyVehiclesResponse.map(
                (e) => {
                    return VehicleMapper.to(e);
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleReadRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findOneById(
        vehicleId: string
    ) {

        try {

            const findUniqueVehicleResponse = await this.client.vehicle.findUnique(
                {
                    where: {
                        id: vehicleId,
                    },
                    include: {
                        pictures: {
                            include: {
                                file: true,
                            }
                        },
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

            return VehicleMapper.to(findUniqueVehicleResponse);

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleReadRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findByOwnerId(
        ownerId: string
    ) {

        try {

            const findManyVehiclesResponse = await this.client.vehicle.findMany(
                {
                    where: {
                        ownerId,
                    },
                    include: {
                        pictures: {
                            include: {
                                file: true,
                            }
                        },
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

            return findManyVehiclesResponse.map(
                (e) => {
                    return VehicleMapper.to(e);
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleReadRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};