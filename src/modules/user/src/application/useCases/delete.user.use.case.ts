import { Injectable } from "@nestjs/common";
import UserWriteRepository from "../../infrastructure/repositories/user.write.repository";

@Injectable()
export default class DeleteUserUseCase {

    public constructor(
        private readonly userWriteRepository: UserWriteRepository,
    ) { };

    public async execute(
        userId: string
    ) {

        try {

            await this.userWriteRepository.delete(userId);

            return {
                msg: 'user deleted successfully'
            };

        } catch (error) {

            throw error;

        };

    };

};