import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class DoesUserExistRepository {

    private readonly loger = new Logger(DoesUserExistRepository.name);

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async exist(
        params: {
            userId: string;
        },
    ): Promise<boolean> {

        const { userId } = params;

        try {

            const count = await this.client.user.count(
                {
                    where: {
                        id: Number(userId),
                    },
                }
            );

            return count > 0;

        } catch (error) {

            throw error;

        };

    };

};