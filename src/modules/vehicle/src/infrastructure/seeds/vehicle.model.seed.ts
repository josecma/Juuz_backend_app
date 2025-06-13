import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import pLimit from 'p-limit';
import NHTSAdapter from "../adapters/nhtsa.adapter";

@Injectable()
export default class VehicleModelSeed {
    private readonly logger = new Logger(VehicleModelSeed.name);
    private readonly limit = pLimit(2);
    private readonly BATCH_DELAY_MS = 3000;
    private readonly REQUEST_DELAY_MS = 1000;

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
        private readonly nhtsAdapter: NHTSAdapter,
    ) { }

    public async up() {
        try {
            const modelSeed = await this.client.seed.findUnique({
                where: { name: "models" }
            });

            if (!modelSeed?.status) {
                const batchSize = 100;
                let lastId: string;

                while (true) {
                    const makes = await this.client.vehicleMake.findMany({
                        ...(lastId && { cursor: { id: lastId } }),
                        orderBy: { createdAt: "asc" },
                        take: batchSize,
                    });

                    if (makes.length === 0) break;

                    let year = 2020;
                    const currentYear = new Date().getFullYear();

                    while (year <= currentYear) {

                        const promises = makes.map(make =>
                            this.limit(() => this.processMakeYear(make, year))
                        );

                        await Promise.all(promises);


                        await new Promise(resolve => setTimeout(resolve, this.REQUEST_DELAY_MS));
                        year++;
                    }

                    lastId = makes[makes.length - 1].id;

                    await new Promise(resolve => setTimeout(resolve, this.BATCH_DELAY_MS));
                }

                await this.client.seed.create({
                    data: {
                        name: "models",
                        status: true,
                    }
                });

                this.logger.log("Models seeded successfully");
            } else {
                this.logger.log("Models already seeded");
            }
        } catch (error) {
            this.logger.error({
                source: `${VehicleModelSeed.name}`,
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

    private async processMakeYear(make: any, year: number) {
        try {
            const getAllModelsResponse = await this.nhtsAdapter.getModelsByMakeIdAndYear({
                makeId: make.makeId,
                year,
            });

            if (getAllModelsResponse.length > 0) {
                await this.client.$transaction(async (tx) => {
                    await tx.vehicleMakeModel.createMany({
                        data: getAllModelsResponse.map(model => ({
                            year,
                            name: model.name,
                            makeId: make.id
                        })),
                        skipDuplicates: true,
                    });
                });
            }
        } catch (error) {
            this.logger.warn(`Failed for make ${make.makeId}, year ${year}: ${error.message}`);
            // Opcional: implementar reintentos aquí
            throw error; // Propaga el error para manejo superior
        }
    }
}