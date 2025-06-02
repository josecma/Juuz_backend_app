import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { IdentityEnum } from "../../domain/enums/identity.enum";
import UserMapper from "../mappers/user.mapper";

@Injectable()
export default class UserReadRepository {

    private readonly logger = new Logger(UserReadRepository.name);

    public constructor(
        private readonly client: PrismaClient,
    ) { };

    public async find() {

        try {

            const findManyResponse = await this.client.user.findMany(
                {
                    include: {
                        identities: true,
                    }
                }
            );

            return findManyResponse.map(
                (e) => UserMapper.to(e)
            );

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

    public async findOneByEmail(
        email: string
    ) {

        try {

            const findOneByEmailResponse = await this.client.user.findFirst({
                where: {
                    identities: {
                        some: {
                            type: IdentityEnum.EMAIL,
                            value: email,
                        }
                    },
                },
                include: {
                    identities: true,
                }
            });

            return findOneByEmailResponse ? UserMapper.to(findOneByEmailResponse) : null;

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

            const findOneByIdResponse = await this.client.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    identities: true,
                }
            });

            return findOneByIdResponse ? UserMapper.to(findOneByIdResponse) : null;

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

            const findManyResponse = await this.client.user.findMany(
                {
                    where: {
                        id: {
                            in: userIds
                        },
                    },
                    include: {
                        identities: true,
                    }
                }
            );

            return findManyResponse.map(
                (e) => UserMapper.to(e)
            );

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
    ) {

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

            this.logger.error(
                {
                    source: `${UserReadRepository.name}`,
                    message: `${error.message}`,
                }
            );

            throw error;

        };

    };

};