import { Injectable } from "@nestjs/common";
import { OtpSecretAdapter } from "src/modules/shared/src/infrastructure/adapters/otp.secret.adapter";
import UserOtpSecretReadRepository from "../../infrastructure/repositories/user.otp.secret.read.repository";
import UserOtpSecretWriteRepository from "../../infrastructure/repositories/user.otp.secret.write.repository";

@Injectable()
export default class GetUserOtpSecretService {

    public constructor(
        private readonly userOtpSecretReadRepository: UserOtpSecretReadRepository,
        private readonly userOtpSecretWriteRepository: UserOtpSecretWriteRepository,
        private readonly otpSecretAdapter: OtpSecretAdapter,
    ) { };

    public async get(
        userId: string,
    ) {

        let otpSecret: {
            id: string;
            userId: string;
            secret: string;
        } = null;

        try {

            otpSecret = await this.userOtpSecretReadRepository.findOneByUserId(
                {
                    userId
                }
            );

            if (!otpSecret) {

                const newSecret = this.otpSecretAdapter.generate();

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