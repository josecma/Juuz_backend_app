import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";
import { IdentityEnum } from "../enums/identity.enum";

@Injectable()
export default class FindUserByEmailService {

    private readonly logger = new Logger(FindUserByEmailService.name);

    public constructor(
        private readonly userReadRepository: UserReadRepository,
        private readonly userIdentityReadRepository: UserIdentityReadRepository,
    ) { };

    public async find(
        email: string
    ) {

        try {

            const userEmail = await this.userIdentityReadRepository.findOneBy(
                {
                    type: IdentityEnum.EMAIL,
                    value: email,
                }
            );

            if (!userEmail) {

                throw new NotFoundException('user email not found');

            };

            const user = await this.userReadRepository.findOneById(userEmail.userId);

            return user;

        } catch (error) {

            throw error;

        };

    };

};