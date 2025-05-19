import { Inject, Injectable } from "@nestjs/common";
import FindOneUserByIdService from "../../domain/services/find.one.user.by.id.service";
import UserRepository from "../../infrastructure/repositories/user.repository";

@Injectable({})
export default class ToggleAndReturnUserLocationUseCase {

    public constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
    ) { };

    public async execute(
        params: {
            id: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            };
        }
    ) {

        const { id, coordinates } = params;

        try {

            const user = await this.findOneUserByIdService.find({ id });

            await this.userRepository.update({
                id,
                updateObj: {
                    share: user.userPoint?.share ? !user.userPoint.share : true,
                    coordinates
                },
            });

            const userToReturn = await this.findOneUserByIdService.find({ id });

            return {
                share: userToReturn.userPoint.share,
                coordinates: {
                    latitude: userToReturn.userPoint.point.latitude,
                    longitude: userToReturn.userPoint.point.longitude,
                },
            };

        } catch (error) {

            throw error;

        };

    };

};