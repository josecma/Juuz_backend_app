import { Injectable } from "@nestjs/common";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

@Injectable()
export default class GetAllUsersUseCase {

    public constructor(
        private readonly userReadRepository: UserReadRepository,
    ) { };

    public async execute() {

        try {

            const users = await this.userReadRepository.find();

            return users;

        } catch (error) {

            throw error;

        };

    };

};