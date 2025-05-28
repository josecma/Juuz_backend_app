import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import GetUserOtpSecretService from "../../domain/services/get.user.otp.secret.service";
import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

@Injectable({})
export default class FindUserByIdUseCase {

    private readonly logger = new Logger(FindUserByIdUseCase.name);

    public constructor(
        private readonly userReadRepository: UserReadRepository,
        private readonly getUserOtpSecretService: GetUserOtpSecretService,
        private readonly userIdentityReadRepository: UserIdentityReadRepository,
    ) { };

    public async execute(
        params: {
            userId: string;
            include?: Record<string, boolean>;
        }
    ) {

        const {
            userId,
            include,
        } = params;

        let emails: Array<{
            value: string,
            metadata: Record<string, unknown>
        }>;

        let phoneNumbers: Array<string>;

        let otpSecret: string;

        try {

            const user = await this.userReadRepository.findOneById(userId);

            if (!user) {
                throw new NotFoundException(
                    {
                        message: 'user not found',
                    }
                );
            };

            if (include?.otpSecret) {

                const res = await this.getUserOtpSecretService.get(user.id);

                otpSecret = res.secret;

            };

            if (include?.emails) {

                const res = await this.userIdentityReadRepository.findUserEmails(user.id);

                emails = res;

            };

            return Object.assign(
                {},
                {
                    user,
                    otpSecret,
                    emails,
                },
            );

        } catch (error) {

            this.logger.debug(error.message);
            throw error;

        };

    };

};