import { Injectable } from "@nestjs/common";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

@Injectable()
export default class GetOneUserUseCase {

    public constructor(
        private readonly userReadRepository: UserReadRepository,
    ) { };

    public async execute(
        userId: string
    ) {

        try {

            const user = await this.userReadRepository.findOneById(userId);

            return user;

        } catch (error) {

            throw error;

        };

    };

};