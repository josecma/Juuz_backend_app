import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class VehicleMakeRepository {

    private readonly logger = new Logger(VehicleMakeRepository.name);

    public constructor(
        private readonly client: PrismaClient,
    ) { };

    public async findByManufacturer(
        manufacturer: string
    ) {

        try {

            const manufacturerMakes = await this.client.$transaction(

                async (tx) => {

                    const oneManufacturerByName = await tx.vehicleManufacturer.findUnique(
                        {
                            where: {
                                name: manufacturer
                            }
                        }
                    );

                    const manyByManufacturerId = await tx.manufacturerMake.findMany(
                        {
                            where: {
                                manufacturerId: oneManufacturerByName.id,
                            }
                        }
                    );

                    const makeSet = await tx.vehicleMake.findMany(
                        {
                            where: {
                                id: {
                                    in: manyByManufacturerId.map(
                                        (e) => e.makeId,
                                    )
                                }
                            }
                        }
                    );

                    return makeSet;

                }

            );

            // const findManyByManufacturerResponse = await this.client.vehicleMake.findMany(
            //     {
            //         where: {
            //             manufacturer: {
            //                 name: manufacturer,
            //             }
            //         }
            //     }
            // );

            return manufacturerMakes;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleMakeRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async save(
        params: {
            makes: Array<string>,
            manufacturerId: string,
        }
    ) {

        const {
            makes,
            manufacturerId,
        } = params;

        try {

            await this.client.vehicleMake.createMany(
                {
                    data: makes.map(
                        (make) => {
                            return {
                                name: make,
                                manufacturerId,
                            }
                        }
                    ),
                    skipDuplicates: true,
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleMakeRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async find(
        params: {
            name?: string,
            year?: number,
        }
    ) {

        const {
            name,
            year
        } = params;

        try {

            const findManyVehicleMakeResponse = await this.client.vehicleMake.findMany(
                {
                    where: {
                        ...(name && {
                            name: {
                                contains: name,
                            }
                        }),
                        ...(year && {
                            models: {
                                some: {
                                    year,
                                }
                            }
                        })
                    }
                }
            );

            return findManyVehicleMakeResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleMakeRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findWithModels() {

        try {

            const findManyVehicleMakeResponse = await this.client.vehicleMake.findMany(
                {
                    include: {
                        models: true
                    }
                }
            );

            return findManyVehicleMakeResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleMakeRepository.name}`,
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

            const findVehicleMakeResponse = await this.client.vehicleMake.findUnique(
                {
                    where: {
                        name,
                    }
                }
            );

            return findVehicleMakeResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleMakeRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findOneById(
        makeId: string
    ) {

        try {

            const findVehicleMakeResponse = await this.client.vehicleMake.findUnique(
                {
                    where: {
                        id: makeId,
                    }
                }
            );

            return findVehicleMakeResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleMakeRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};