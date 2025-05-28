import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ThrottlerException } from "@nestjs/throttler";
import { IdentityEnum } from "src/modules/user/src/domain/enums/identity.enum";
import { AuthMethodEnum } from "../../domain/enums/auth.method.enum";
import { AuthNProcessStatusEnum } from "../../domain/enums/auth.process.status.enum";
import CreateUserAdapter from "../../infrastructure/adapters/create.user.adapter";
import FindEmailOwnerAdapter from "../../infrastructure/adapters/find.email.owner.adapter";
import TotpAdapter from "../../infrastructure/adapters/totp.adapter";
import AuthProcessReadRepository from "../../infrastructure/repositories/auth.process.read.repository";
import AuthProcessWriteRepository from "../../infrastructure/repositories/auth.process.write.repository";
import OtpSecretCacheRepository from "../../infrastructure/repositories/otp.secret.cache.repository";
import UserAuthProcessWriteRepository from "../../infrastructure/repositories/user.auth.process.write.repository";

@Injectable({})
export default class CompleteOtpAuthByEmailUseCase {

    private readonly logger = new Logger(CompleteOtpAuthByEmailUseCase.name);

    public constructor(
        private readonly totpAdapter: TotpAdapter,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly authProcessReadRepository: AuthProcessReadRepository,
        private readonly authProcessWriteRepository: AuthProcessWriteRepository,
        private readonly userAuthProcessWriteRepository: UserAuthProcessWriteRepository,
        private readonly createUserAdapter: CreateUserAdapter,
        private readonly findEmailOwnerAdapter: FindEmailOwnerAdapter,
        private readonly otpSecretCacheRepository: OtpSecretCacheRepository,
    ) { };

    public async execute(
        params: {
            email: string;
            key: string;
        },
    ) {

        const {
            email,
            key,
        } = params;

        let user: {
            id: string,
            firstName?: string,
            lastName?: string,
            emails: Array<{
                value: string,
                metadata: Record<string, unknown>,
            }>,
        } = null;

        try {

            const PendingOtpAuthProcessByEmail = await this.authProcessReadRepository.findPendingOtpAuthByEmail(
                {
                    method: AuthMethodEnum.TOTP,
                    email,
                }
            );

            if (!PendingOtpAuthProcessByEmail) {
                throw new NotFoundException(
                    {
                        message: 'otp auth process by email not found',
                    }
                );
            };

            if (!(PendingOtpAuthProcessByEmail.attempts < 3)) {

                await this.authProcessWriteRepository.update(
                    {
                        id: PendingOtpAuthProcessByEmail.id,
                        updateObject: {
                            status: AuthNProcessStatusEnum.FAILED,
                        }
                    }
                );

                throw new ThrottlerException('you have exceeded the maximum number of attempts allowed');

            };

            const secret = await this.otpSecretCacheRepository.get(email);

            if (!(this.totpAdapter.verifyToken({ secret, token: key }))) {

                await this.authProcessWriteRepository.update({
                    id: PendingOtpAuthProcessByEmail.id,
                    updateObject: {
                        attempts: PendingOtpAuthProcessByEmail.attempts + 1,
                    }
                });

                throw new BadRequestException(
                    {
                        source: `${CompleteOtpAuthByEmailUseCase.name}`,
                        message: 'not valid key'
                    }
                );
            };

            await this.authProcessWriteRepository.update({
                id: PendingOtpAuthProcessByEmail.id,
                updateObject: {
                    status: AuthNProcessStatusEnum.SUCCESS,
                }
            });

            user = await this.findEmailOwnerAdapter.find(email);

            if (!user) {

                user = await this.createUserAdapter.create(
                    {
                        identities: [
                            {
                                type: IdentityEnum.EMAIL,
                                value: email,
                            }
                        ]
                    }
                );

                await this.userAuthProcessWriteRepository.save(
                    {
                        userId: user.id,
                        authNProcessId: PendingOtpAuthProcessByEmail.id,
                    }
                );

            };

            const payload = {
                sub: user.id,
                email,
            };

            const accessToken = await this.jwtService.signAsync(
                payload,
                {
                    secret: this.configService.get<string>('SECRET'),
                    expiresIn: this.configService.get<string>('EXPIRESIN'),
                }
            );

            const refreshToken = await this.jwtService.signAsync(
                payload,
                {
                    secret: this.configService.get<string>('REFRESH_SECRET'),
                    expiresIn: this.configService.get<string>('REFRESH_EXPIRESIN'),
                }
            );

            return {
                accessToken,
                refreshToken,
                user,
            };

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompleteOtpAuthByEmailUseCase.name}`,
                    message: `${error.message}`,
                }
            );

            throw error;

        };

    };

};