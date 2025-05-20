import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class AuthProcessReadRepository {

    public constructor(
        private readonly client: PrismaClient,
    ) { };

    public async findPendingOtpAuthByEmail(
        params: {
            method: string;
            email: string;
        }
    ) {

        const {
            method,
            email,
        } = params;

        try {

            const res = await this.client.authenticationProcess.findFirst(
                {
                    where: {
                        method,
                        status: 'PENDING',
                        metadata: {
                            path: ['email'],
                            equals: email,
                        }
                    },
                    orderBy: {
                        createdAt: 'desc',
                    }
                }
            );

            return res as {
                id: string;
                method: string;
                status: string;
                attempts: number;
                metadata: {
                    email: string;
                };
                createdAt: Date;
            };

        } catch (error) {

            throw error;

        };

    };

};