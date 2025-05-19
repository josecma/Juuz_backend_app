
import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import PointRepository from "../infrastructure/point.repository";

@Injectable()
export default class FindOnePointByService {

    public constructor(
        @Inject(PointRepository)
        private readonly pointRepository: PointRepository,
    ) { };

    public async execute(params: { id: string; }) {

        const { id } = params;

        try {

            if (!id) {

                throw new Error(`${FindOnePointByService.name}Err: params is required`);

            };

            const point = await this.pointRepository.findOneBy({ id });

            if (!point) {

                throw new NotFoundException(`point with id:${id} does not exists`);

            };

            return point;

        } catch (error) {

            if (error instanceof NotFoundException) {

                throw error;

            };

            throw new InternalServerErrorException(error);

        };

    };

};