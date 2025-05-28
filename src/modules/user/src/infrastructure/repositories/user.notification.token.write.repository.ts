import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class UserNotificationTokenWriteRepository {

    private readonly logger = new Logger(UserNotificationTokenWriteRepository.name);

    public constructor(
        private readonly client: PrismaClient,
    ) { };

    public async upsert(
        params: {
            userId: string,
            token: string,
            platform: string,
        }
    ) {

        const {
            userId,
            token,
            platform,
        } = params;

        try {

            const res = await this.client.userNotificationToken.upsert(
                {
                    where: {
                        userId_platform: {
                            userId,
                            platform,
                        }
                    },
                    update: {
                        token,
                    },
                    create: {
                        userId,
                        token,
                        platform,
                    }
                }
            );

            return res;

        } catch (error) {

            this.logger.error(
                {
                    source: `${UserNotificationTokenWriteRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    // public async update(
    //     params: {
    //         userId: string,
    //         token: string,
    //         metadata: Record<string, unknown>,
    //     }
    // ) {

    //     const {
    //         userId,
    //         token,
    //         metadata,
    //     } = params;

    //     try {

    //         const res = await this.client.userNotificationToken.update(
    //             {
    //                 where: {
    //                     us,
    //                     metadata: {
    //                         path: ['platform'],
    //                         equals: metadata?.platform as string,
    //                     }
    //                 },
    //                 data: {
    //                     userId,
    //                     token,
    //                     metadata: metadata as Prisma.JsonValue,
    //                 }
    //             }
    //         );

    //         return res as Omit<typeof res, 'metadata'> & { metadata: Record<string, unknown> };

    //     } catch (error) {

    //         this.logger.error(
    //             {
    //                 source: `${UserNotificationTokenWriteRepository.name}`,
    //                 message: error.message,
    //             }
    //         );

    //         throw error;

    //     };

    // };

};