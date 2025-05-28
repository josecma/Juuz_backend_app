import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { IdentityEnum } from "../../domain/enums/identity.enum";
import Email from "../../domain/valueObjects/email";

@Injectable()
export default class UserIdentityReadRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findByUserId(
        userId: string
    ) {

        try {

            const res = await this.client.identity.findMany(
                {
                    where: {
                        userId,
                    }
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

    public async findOneBy(
        params: {
            type: string,
            value: string,
        }
    ) {

        const {
            type,
            value,
        } = params;

        try {

            const res = await this.client.identity.findUnique(
                {
                    where: {
                        type_value: {
                            type,
                            value,
                        },
                    }
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

    public async findOneByUserId(
        params: {
            userId: string;
            type: string;
            value: string;
        }
    ) {

        const {
            type,
            value,
            userId
        } = params;

        try {

            const res = await this.client.identity.findUnique(
                {
                    where: {
                        userId,
                        type_value: {
                            type,
                            value,
                        },
                    }
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

    public async findEmailSet(
        emails: Array<Email>,
    ) {

        try {

            const res = await this.client.identity.findMany(
                {
                    where: {
                        type: IdentityEnum.EMAIL,
                        value: {
                            in: emails.map((email) => email.toString()),
                        }
                    }
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

    public async findUserEmails(
        userId: string,
    ) {

        try {

            const res = await this.client.identity.findMany(
                {
                    where: {
                        type: IdentityEnum.EMAIL,
                        userId,
                    }
                },
            );

            return res.map(
                (identity) => {
                    return {
                        value: identity.value,
                        metadata: identity.metadata as Record<string, unknown>,
                    };
                }
            );

        } catch (error) {

            throw error;

        };

    };


};