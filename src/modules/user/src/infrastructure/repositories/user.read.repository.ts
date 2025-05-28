import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import UserMapper from "../mappers/user.mapper";

@Injectable()
export default class UserReadRepository {

    private readonly logger = new Logger(UserReadRepository.name);

    public constructor(
        private readonly client: PrismaClient,
    ) { };

    public async find() {

        try {

            const users = await this.client.user.findMany({});

            return users;

        } catch (error) {

            this.logger.error(
                {
                    source: `${UserReadRepository.name}`,
                    message: `${error.message}`,
                }
            );

            throw new error;

        };

    };

    public async findOneById(
        userId: string
    ) {

        try {

            const user = await this.client.user.findUnique({
                where: {
                    id: userId,
                },
            });

            return UserMapper.to(user);

        } catch (error) {

            this.logger.error(
                {
                    source: `${UserReadRepository.name}`,
                    message: `${error.message}`,
                }
            );

            throw new error;

        };

    };

    public async findSetById(
        userIds: Array<string>
    ) {

        try {

            const users = await this.client.user.findMany(
                {
                    where: {
                        id: {
                            in: userIds
                        },
                    },
                }
            );

            return users;

        } catch (error) {

            this.logger.error(
                {
                    source: `${UserReadRepository.name}`,
                    message: `${error.message}`,
                }
            );

            throw error;

        };

    };

    public async exist(
        userId: string
    ): Promise<boolean> {

        try {

            const count = await this.client.user.count(
                {
                    where: {
                        id: userId,
                    },
                }
            );

            return count > 0;

        } catch (error) {

            throw error;

        };

    };

};