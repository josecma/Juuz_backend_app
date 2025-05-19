import { Inject, Injectable } from "@nestjs/common";
import OtpSecretPort from "src/modules/shared/src/application/ports/otp.secret.port";
import CryptoAdapter from "src/modules/shared/src/infrastructure/adapters/crypto.adapter";
import { OtpSecretAdapter } from "src/modules/shared/src/infrastructure/adapters/otp.secret.adapter";
import UserOtpSecretReadRepository from "../../infrastructure/repositories/user.otp.secret.read.repository";
import UserOtpSecretWriteRepository from "../../infrastructure/repositories/user.otp.secret.write.repository";

@Injectable()
export default class GetUserOtpSecretService {

    public constructor(
        @Inject(UserOtpSecretReadRepository)
        private readonly userOtpSecretReadRepository: UserOtpSecretReadRepository,
        @Inject(UserOtpSecretWriteRepository)
        private readonly userOtpSecretWriteRepository: UserOtpSecretWriteRepository,
        @Inject(OtpSecretAdapter)
        private readonly otpSecretAdapter: OtpSecretPort,
        // @Inject(CryptoAdapter)
        // private readonly cryptoAdapter: CryptoAdapter,
    ) { };

    public async get(
        userId: string,
    ) {

        let otpSecret: {
            id: string;
            userId: string;
            secret: string;
            algorithm: string | null;
            isActive: boolean;
            createdAt: Date;
        } = null;

        try {

            otpSecret = await this.userOtpSecretReadRepository.findOneByUserId(
                {
                    userId
                }
            );

            if (!otpSecret) {

                const newSecret = this.otpSecretAdapter.generate();

                // const encryptedSecret = this.cryptoAdapter.encrypt(newSecret)

                otpSecret = await this.userOtpSecretWriteRepository.save(
                    {
                        userId,
                        encryptedSecret: newSecret,
                    }
                );

            };

            return otpSecret;

        } catch (error) {

            throw error;

        };

    };

};