import { Injectable, Logger } from "@nestjs/common";
import FindUserByIdUseCase from "./find.user.by.id.use.case";

@Injectable()
export default class GetUserProfileUseCase {

    private readonly logger = new Logger(GetUserProfileUseCase.name);

    public constructor(
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
    ) { };

    public async execute(
        userId: string
    ) {

        try {

            const userProfile = await this.findUserByIdUseCase.execute(
                {
                    userId,
                    include: {
                        emails: true,
                        company: true,
                    }
                }
            );

            const { user, ...userProfileRes } = userProfile;

            return Object.assign(
                {},
                userProfileRes,
                {
                    ...user.toJSON(),
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${GetUserProfileUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};