import { Inject, Injectable } from "@nestjs/common";
import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
import UserIdentityWriteRepository from "../../infrastructure/repositories/user.identity.write.repository";

@Injectable()
export default class CreateUserIdentityService {

    public constructor(
        @Inject(UserIdentityWriteRepository)
        private readonly userIdentityWriteRepository: UserIdentityWriteRepository,
        @Inject(UserIdentityReadRepository)
        private readonly userIdentityReadRepository: UserIdentityReadRepository,
    ) { };

    public async create(
        params: {
            userId: string;
            identity: {
                type: string;
                value: string;
            };
        },
    ) {

        const {
            userId,
            identity,
        } = params;

        const {
            type,
            value,
        } = identity;

        try {

            let created = null;

            created = await this.userIdentityReadRepository.findOneBy(
                {
                    type,
                    value,
                }
            );

            if (!created) {

                created = await this.userIdentityWriteRepository.save(
                    {
                        userId,
                        identity,
                    }
                );

            };

            return created as unknown as {
                userId: string;
                type: string;
                value: string;
                id: string;
                metadata: Record<string, unknown>;
                verified: boolean;
                createdAt: Date;
                updatedAt: Date;
            };

        } catch (error) {

            throw error;

        };

    };

};