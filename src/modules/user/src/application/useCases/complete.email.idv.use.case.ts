import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ThrottlerException } from "@nestjs/throttler";
import { IdentityEnum } from "../../domain/enums/identity.enum";
import GetUserOtpSecretService from "../../domain/services/get.user.otp.secret.service";
import TotpAdapter from "../../infrastructure/adapters/totp.adapter";
import IdvReadRepository from "../../infrastructure/repositories/idv.read.repository";
import IdvWriteRepository from "../../infrastructure/repositories/idv.write.repository";
import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
import UserIdentityWriteRepository from "../../infrastructure/repositories/user.identity.write.repository";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

@Injectable({})
export default class CompleteEmailIdvUseCase {

    private readonly logger = new Logger(CompleteEmailIdvUseCase.name);

    public constructor(
        private readonly totpAdapter: TotpAdapter,
        private readonly getUserOtpSecretService: GetUserOtpSecretService,
        private readonly idvWriteRepository: IdvWriteRepository,
        private readonly idvReadRepository: IdvReadRepository,
        private readonly userIdentityReadRepository: UserIdentityReadRepository,
        private readonly identityWriteRepository: UserIdentityWriteRepository,
        private readonly userReadRepository: UserReadRepository,
    ) { };

    public async execute(
        params: {
            userId: string;
            email: string;
            key: string;
        },
    ) {

        const {
            userId,
            email,
            key,
        } = params;

        let secret: string;

        try {

            const user = await this.userReadRepository.findOneById(userId);

            if (!user) {
                throw new NotFoundException(
                    {
                        source: `${CompleteEmailIdvUseCase.name}`,
                        message: 'user not found',
                    }
                );
            };

            const userIdentity = await this.userIdentityReadRepository.findOneByUserId(
                {
                    userId,
                    type: IdentityEnum.EMAIL,
                    value: email,
                }
            );

            if (!userIdentity) {
                throw new NotFoundException(
                    {
                        source: `${CompleteEmailIdvUseCase.name}`,
                        message: 'user identity not found',
                    }
                );
            };


            const idvPending = await this.idvReadRepository.findPending(userIdentity.id);

            if (!(idvPending.attempts < 3)) {

                await this.idvWriteRepository.update(
                    {
                        id: idvPending.id,
                        updateObject: {
                            status: 'FAILED',
                        }
                    }
                );

                throw new ThrottlerException('you have exceeded the maximum number of attempts allowed');

            };

            const userOtpSecret = await this.getUserOtpSecretService.get(userId);

            secret = userOtpSecret.secret;

            if (!(this.totpAdapter.verifyToken({ secret, token: key }))) {

                await this.idvWriteRepository.update({
                    id: idvPending.id,
                    updateObject: {
                        attempts: idvPending.attempts + 1,
                    }
                });

                throw new BadRequestException(
                    {
                        source: `${CompleteEmailIdvUseCase.name}`,
                        message: 'not valid key'
                    }
                );
            };

            await this.idvWriteRepository.update({
                id: idvPending.id,
                updateObject: {
                    status: 'SUCCESS',
                }
            });

            await this.identityWriteRepository.update(
                {
                    id: userIdentity.id,
                    updateObject: {
                        verified: true,
                    }
                }
            );

            return {
                message: 'idv completed successfully',
            };

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

};