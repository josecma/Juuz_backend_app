import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { InfrastructureEventEmitter } from "src/modules/shared/src/infrastructure/events/infrastructure.event.emitter";
import NHTSAdapter from "../adapters/nhtsa.adapter";

@Injectable()
export default class VehicleManufacturerSeed {

    private readonly logger = new Logger(VehicleManufacturerSeed.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
        private readonly nhtsAdapter: NHTSAdapter,
        private readonly infrastructureEventEmitter: InfrastructureEventEmitter,
    ) { }

    public async up() {

        try {

            const manufacturerSeed = await this.client.seed.findUnique(
                {
                    where: {
                        name: "manufacturers"
                    }
                }
            );

            if (
                !manufacturerSeed?.status
            ) {

                const getAllManufacturersResponse = await this.nhtsAdapter.getAllManufacturers();

                this.client.$transaction(
                    async (tx) => {

                        await tx.vehicleManufacturer.createMany(
                            {
                                data: getAllManufacturersResponse,
                                skipDuplicates: true,
                            }
                        );

                        await tx.seed.create(
                            {
                                data: {
                                    name: "manufacturers",
                                    status: true,
                                }
                            }
                        );

                    }
                );

                this.logger.log("manufacturers seeded successfully");

                this.infrastructureEventEmitter.emitEvent(
                    "manufacturers.seed.up"
                );

            } else {

                this.logger.log("manufacturers seeded already");

            };

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleManufacturerSeed.name}`,
                    message: error.message,
                }
            );

        };

    };

};