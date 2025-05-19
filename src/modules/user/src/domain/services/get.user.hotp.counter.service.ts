import { Inject, Injectable } from "@nestjs/common";
import UserHotpCounterReadRepository from "../../infrastructure/repositories/user.hotp.counter.read.repository";
import UserHotpCounterWriteRepository from "../../infrastructure/repositories/user.hotp.counter.write.repository";

@Injectable({})
export default class GetUserHotpCounterService {

    public constructor(
        @Inject(UserHotpCounterWriteRepository)
        private readonly userHotpCounterWriteRepository: UserHotpCounterWriteRepository,
        @Inject(UserHotpCounterReadRepository)
        private readonly userHotpCounterReadRepository: UserHotpCounterReadRepository,
    ) { };

    public async get(
        userOtpSecretId: string
    ): Promise<number> {

        try {

            const userHotpCounter = await this.userHotpCounterReadRepository.findOneByUserOtpSecretId(userOtpSecretId);

            if (userHotpCounter) {

                const updated = await this.userHotpCounterWriteRepository.update(
                    {
                        id: userHotpCounter.id,
                        updateObject: {
                            counter: userHotpCounter.counter + 1,
                        }
                    }
                );

                return updated.counter;

            };

            const created = await this.userHotpCounterWriteRepository.save(
                {
                    userOtpSecretId,
                    counter: 0,
                }
            );

            return created.counter;

        } catch (error) {

            throw error;

        };

    };

};