import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import UserNotificationTokenWriteRepository from "../../infrastructure/repositories/user.notification.token.write.repository";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

@Injectable()
export default class CreateOrUpdateUserNotificationTokenUseCase {

    private readonly logger = new Logger(CreateOrUpdateUserNotificationTokenUseCase.name);

    public constructor(
        private readonly userReadRepository: UserReadRepository,
        private readonly userNotificationTokenWriteRepository: UserNotificationTokenWriteRepository,
    ) { };

    public async execute(
        params: {
            userId: string,
            token: string,
            platform: string,
        },
    ) {

        const {
            userId,
            token,
            platform,
        } = params;

        try {

            const user = await this.userReadRepository.findOneById(userId);

            if (!user) {

                throw new NotFoundException('user not found');

            };

            this.userNotificationTokenWriteRepository.upsert(
                {
                    userId,
                    token,
                    platform,
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${UserNotificationTokenWriteRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};