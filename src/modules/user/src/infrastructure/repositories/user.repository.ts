import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class UserRepository {

    public constructor(
        @Inject()
        private readonly client: PrismaClient,
    ) { };

    public async findBy(
        params: {
            ids: number[];
        }
    ) {

        const { ids } = params;

        try {

            const users = await this.client.user.findMany({
                where: {
                    id: {
                        in: ids
                    },
                },
            });

            return users;

        } catch (error) {

            throw new Error(error);

        };

    };

    public async findOneBy(
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

    public async update(
        params: {
            id: string;
            updateObj: {
                share?: boolean;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                };
            };
        }
    ): Promise<any> {

        const { id, updateObj } = params;

        const { coordinates, share } = updateObj;

        const { latitude, longitude } = coordinates;

        const coords = JSON.stringify({ type: "Point", coordinates: [longitude, latitude] });

        try {

            const res = await this.client.$transaction(async (tx) => {

                const userPoint = await tx.userPoint.findUnique({
                    where: {
                        userId: Number(id),
                    }
                });

                if (!userPoint) {

                    const points: number = await tx.$queryRaw`
                    INSERT INTO "Point" (coords, latitude, longitude) 
                    VALUES (ST_GeomFromGeoJSON(${coords}), ${latitude}, ${longitude}) RETURNING id;`;

                    await tx.userPoint.create(
                        {
                            data: {
                                userId: Number(id),
                                pointId: points[0].id,
                                share,
                            },
                        }
                    );

                } else {

                    if (coordinates) {

                        await tx.$queryRaw`
                          UPDATE "Point" 
                          SET 
                            coords = ST_GeomFromGeoJSON(${coords}),
                            latitude = ${latitude},
                            longitude = ${longitude}
                          WHERE id = ${userPoint.pointId};
                        `;
                    };

                    if (share !== undefined) {
                        await tx.userPoint.update({
                            where: { userId: Number(id) },
                            data: { share },
                        });
                    };

                };

                return await tx.user.findUnique(
                    {
                        where: {
                            id: Number(id),
                        },
                        include: {
                            userPoint: {
                                include: {
                                    point: true,
                                },
                            },
                        },
                    }
                );

            });

            return res;

        } catch (error) {

            throw error;

        };

    };

};