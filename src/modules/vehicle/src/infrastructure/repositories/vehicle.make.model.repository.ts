import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import ModelMapper from "../mappers/model.mapper";

@Injectable({})
export default class VehicleMakeModelRepository {

    private readonly logger = new Logger(VehicleMakeModelRepository.name);

    public constructor(
        private readonly client: PrismaClient,
    ) { };

    public async save(
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

            await this.client.vehicleMakeModel.createMany(
                {
                    data: models.map(
                        (e) => { return { makeId, year: e.year, name: e.name } }
                    ),
                    skipDuplicates: true
                },
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleMakeModelRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findByMakeId(
        makeId: string
    ) {

        try {

            const findManyByMakeIdResponse = await this.client.vehicleMakeModel.findMany(
                {
                    where: {
                        make: {
                            id: makeId,
                        }
                    }
                }
            );

            return findManyByMakeIdResponse.map(
                e => ModelMapper.to(e)
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleMakeModelRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findByMakeIdAndYear(
        params: {
            makeId: string,
            year: number,
        }
    ) {

        const {
            makeId,
            year,
        } = params;

        try {

            const findByMakeIdAndYearResponse = await this.client.vehicleMakeModel.findMany(
                {
                    where: {
                        make: {
                            id: makeId,
                        },
                        year
                    }
                }
            );

            return findByMakeIdAndYearResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${VehicleMakeModelRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};