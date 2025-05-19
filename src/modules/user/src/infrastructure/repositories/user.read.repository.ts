import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class UserReadRepository {

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async findOneByEmail(
        params: {
            id: string;
        }
    ) {

        const { id } = params;

        try {

            const user = await this.client.user.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    userPoint: {
                        include: {
                            point: true,
                        }
                    },
                    channels: {
                        include: {
                            channel: true,
                        }
                    },
                }
            });

            return user;

        } catch (error) {

            throw new error;

        };

    };


};