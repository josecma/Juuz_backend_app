import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class UserIdentityVerificationWriteRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            identityId: string;
            requestId: string;
            keyId: string;
        },
    ) {

        const {
            identityId,
            requestId,
            keyId,
        } = params;

        try {

            const res = await this.client.userIdentityVerification.create(
                {
                    data: {
                        identityId,
                        keyId,
                        requestId,
                    },
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

    public async update(
        params: {
            id: string;
            updateObject: {
                status?: string;
            };
        },
    ) {

        const {
            id,
            updateObject,
        } = params;

        try {

            const res = await this.client.userIdentityVerification.update(
                {
                    where: {
                        id
                    },
                    data: updateObject,
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

};