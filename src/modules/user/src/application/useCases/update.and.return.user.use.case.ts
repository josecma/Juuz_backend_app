import { Inject, Injectable } from "@nestjs/common";
import FindOneUserByIdService from "../../domain/services/find.one.user.by.id.service";
import UserRepository from "../../infrastructure/repositories/user.repository";

@Injectable({})
export default class UpdateAndReturnUserUseCase {

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

            return await this.userRepository.update({
                id,
                updateObj: {
                    coordinates,
                }
            });

        } catch (error) {

            throw error;

        };

    };

};