import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import PointRepository from "../infrastructure/point.repository";
import FindOnePointByService from "./find.one.point.by.service";

@Injectable({})
export default class UpsertAndReturnPointService {

    public constructor(
        @Inject(FindOnePointByService)
        private readonly findOnePointByService: FindOnePointByService,
        @Inject(PointRepository)
        private readonly pointRepository: PointRepository,
    ) { };

    public async execute(params: {
        id?: string;
        upsertPointParams: {
            shared: boolean;
            coordinates: {
                latitude: number;
                longitude: number;
            };
        };
    }) {

        const { id, upsertPointParams } = params;

        const { shared, coordinates } = upsertPointParams;

        try {

            if (!coordinates) {

                throw new Error(`${UpsertAndReturnPointService}Err: params.coordinates is required`);

            };

            if (id) {

                const point = await this.findOnePointByService.execute({ id });

                return await this.pointRepository.update({
                    id: id,
                    updateObj: {
                        shared: !point.isActive,
                        coordinates,
                    },
                });

            } else {

                return await this.pointRepository.save({
                    shared,
                    coordinates,
                });

            };

        } catch (error) {

            if (error instanceof NotFoundException) {

                throw error;

            };

            throw new InternalServerErrorException(error);

        };

    };

};