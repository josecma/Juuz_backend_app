import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import User from "../../domain/entities/user";
import { IdentityEnum } from "../../domain/enums/identity.enum";
import Email from "../../domain/valueObjects/email";
import UserMapper from "../mappers/user.mapper";

@Injectable()
export default class UserWriteRepository {

    private readonly logger = new Logger(UserWriteRepository.name);

    public constructor(
        private readonly client: PrismaClient,
    ) { };

    // public async update(
    //     params: {
    //         id: string;
    //         updateObj: {
    //             share?: boolean;
    //             coordinates?: {
    //                 latitude: number;
    //                 longitude: number;
    //             };
    //         };
    //     }
    // ) {

    //     const { id, updateObj } = params;

    //     const { coordinates, share } = updateObj;

    //     const { latitude, longitude } = coordinates;

    //     const coords = JSON.stringify({ type: "Point", coordinates: [longitude, latitude] });

    //     try {

    //         const res = await this.client.$transaction(async (tx) => {

    //             const userPoint = await tx.userPoint.findUnique({
    //                 where: {
    //                     userId: id,
    //                 }
    //             });

    //             if (!userPoint) {

    //                 const points: number = await tx.$queryRaw`
    //                 INSERT INTO "Point" (coords, latitude, longitude) 
    //                 VALUES (ST_GeomFromGeoJSON(${coords}), ${latitude}, ${longitude}) RETURNING id;`;

    //                 await tx.userPoint.create(
    //                     {
    //                         data: {
    //                             userId: id,
    //                             pointId: points[0].id,
    //                             share,
    //                         },
    //                     }
    //                 );

    //             } else {

    //                 if (coordinates) {

    //                     await tx.$queryRaw`
    //                       UPDATE "Point" 
    //                       SET 
    //                         coords = ST_GeomFromGeoJSON(${coords}),
    //                         latitude = ${latitude},
    //                         longitude = ${longitude}
    //                       WHERE id = ${userPoint.pointId};
    //                     `;
    //                 };

    //                 if (share !== undefined) {
    //                     await tx.userPoint.update({
    //                         where: { userId: id },
    //                         data: { share },
    //                     });
    //                 };

    //             };

    //             return await tx.user.findUnique(
    //                 {
    //                     where: {
    //                         id: id,
    //                     },
    //                     include: {
    //                         userPoint: {
    //                             include: {
    //                                 point: true,
    //                             },
    //                         },
    //                     },
    //                 }
    //             );

    //         });

    //         return res;

    //     } catch (error) {

    //         throw error;

    //     };

    // };

    public async save(
        params: {
            user: User,
            credential?: string,
            emails: Array<Email>,
        }
    ) {

        const {
            user,
            credential,
            emails,
        } = params;

        const {
            id,
            firstName,
            lastName,
        } = user.toJSON();

        try {

            const res = await this.client.$transaction(
                async (tx) => {
                    const savedUser = await tx.user.create(
                        {
                            data: {
                                firstName,
                                lastName,
                                verified: false,
                            }
                        }
                    );

                    await tx.identity.createMany(
                        {
                            data: emails.map(
                                (email) => {

                                    return {
                                        userId: savedUser.id,
                                        type: IdentityEnum.EMAIL,
                                        value: email.toString(),
                                    }

                                }
                            ),
                        }
                    );

                    if (credential) {

                        await tx.credential.create(
                            {
                                data: {
                                    value: credential,
                                    userId: id,
                                }
                            }
                        );

                    };

                    return await tx.user.findUnique(
                        {
                            where: {
                                id: savedUser.id,
                            },
                            include: {
                                identities: true,
                            },
                        }
                    );

                }
            );

            return {
                user: UserMapper.to(res),
                emails: res.identities.map(
                    (identity) => {
                        if (identity.type === "EMAIL") return {
                            value: identity.value,
                            metadata: identity.metadata as Record<string, unknown>,
                        };
                    }
                ),
            };

        } catch (error) {

            this.logger.error(
                {
                    source: `${UserWriteRepository.name}`,
                    message: `${error.message}`,
                }
            );

            throw error;

        };

    };

    public async update(
        params: {
            id: string,
            updateObj: {
                firstName?: string,
                lastName?: string,
                verified?: boolean,
            },
        }
    ) {

        const {
            id,
            updateObj,
        } = params;

        try {

            const res = await this.client.$transaction(
                async (tx) => {

                    const updatedUser = await tx.user.update(
                        {
                            where: {
                                id,
                            },
                            data: updateObj,
                        }
                    );

                    return updatedUser;

                }
            );

            return res;

        } catch (error) {

            this.logger.error(
                {
                    source: `${UserWriteRepository.name}`,
                    message: `${error.message}`,
                }
            );

            throw error;

        };

    };

    public async delete(
        userId: string
    ) {

        try {

            await this.client.$transaction(
                async (tx) => {
                    await tx.credential.delete(
                        {
                            where: {
                                userId,
                            }
                        }
                    );

                    await tx.identity.deleteMany(
                        {
                            where: {
                                userId
                            }
                        }
                    );

                    await tx.user.delete(
                        {
                            where: {
                                id: userId,
                            }
                        }
                    )

                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${UserWriteRepository.name}`,
                    message: `${error.message}`,
                }
            );

            throw error;

        };

    };

};