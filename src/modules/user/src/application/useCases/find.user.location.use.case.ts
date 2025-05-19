import { InternalErrorException } from "@aws-sdk/client-sns";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import FindOneUserByIdService from "../../domain/services/find.one.user.by.id.service";

@Injectable()
export default class FindUserLocationUseCase {

    public constructor(
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
    ) { };

    public async execute(params: { id: string; }) {

        const { id } = params;

        try {

            const user = await this.findOneUserByIdService.find({ id });

            if (!user.userPoint) {

                throw new NotFoundException(`coordinates not found`);

            };

            return {
                share: user.userPoint?.share,
                coordinates: {
                    latitude: user.userPoint?.point.latitude,
                    longitude: user.userPoint?.point.longitude,
                },
            };

        } catch (error) {

            if (error instanceof NotFoundException) {

                throw error;

            };

            throw new InternalErrorException(error);

        };

    };

};