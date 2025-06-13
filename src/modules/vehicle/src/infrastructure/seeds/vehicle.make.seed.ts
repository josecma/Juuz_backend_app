import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import NHTSAdapter from "../adapters/nhtsa.adapter";

@Injectable()
export default class VehicleMakeSeed {

    private readonly logger = new Logger(VehicleMakeSeed.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
        private readonly nhtsAdapter: NHTSAdapter,
    ) { }

    public async up() {

        try {

            const makeSeed = await this.client.seed.findUnique(
                {
                    where: {
                        name: "makes"
                    }
                }
            );

            if (
                !makeSeed?.status
            ) {

                const getAllMakesResponse = await this.nhtsAdapter.getAllMakes();

                this.client.$transaction(
                    async (tx) => {

                        await tx.vehicleMake.createMany(
                            {
                                data: getAllMakesResponse,
                                skipDuplicates: true,
                            }
                        );

                        await tx.seed.create(
                            {
                                data: {
                                    name: "makes",
                                    status: true,
                                }
                            }
                        );

                    }
                );

                this.logger.log("makes seeded successfully");

            } else {

                this.logger.log("makes seeded already");

            };

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleMakeSeed.name}`,
                    message: error.message,
                }
            );

        };

    };

};