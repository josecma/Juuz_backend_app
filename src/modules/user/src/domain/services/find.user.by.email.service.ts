import { Injectable, Logger } from "@nestjs/common";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

@Injectable()
export default class FindUserByEmailService {

    private readonly logger = new Logger(FindUserByEmailService.name);

    public constructor(
        private readonly userReadRepository: UserReadRepository,
    ) { };

    public async find(
        email: string
    ) {

        try {

            if (email == null) {

                throw new Error("email is required");

            };

            const findOneByEmailResponse = await this.userReadRepository.findOneByEmail(email);

            if (findOneByEmailResponse == null) return null;

            return findOneByEmailResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindUserByEmailService.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};