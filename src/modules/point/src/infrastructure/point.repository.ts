import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class PointRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneBy(findOneByObj: {
        id: string;
    },
    ) {

        const { id } = findOneByObj;

        try {

            const point = await this.client.point.findUnique({
                where: {
                    id: id,
                },
            });

            return point;

        } catch (error) {

            throw error;

        };

    };

    public async update(params: {
        id: string;
        updateObj: Partial<{
            shared: boolean;
            coordinates: {
                latitude: number;
                longitude: number;
            };
        }>;
    }) {

        const { id, updateObj } = params;

        const { shared, coordinates } = updateObj;

        try {

            let SET = [];
            let VALUES = [];
            let counter = 1;

            if (shared !== undefined) {
                SET.push(`is_active = $${counter}`);
                VALUES.push(shared);
                counter++;
            };

            if (coordinates) {
                SET.push(`coords = ST_GeomFromGeoJSON($${counter})`);
                VALUES.push(JSON.stringify({ type: "Point", coordinates: [coordinates.longitude, coordinates.latitude] }));
                counter++;

                SET.push(`latitude = $${counter}`);
                VALUES.push(coordinates.latitude);
                counter++;

                SET.push(`longitude = $${counter}`);
                VALUES.push(coordinates.longitude);
                counter++;
            };

            if (SET.length > 0) {

                let queryUpdate = `UPDATE "Point" SET ${SET.join(', ')} WHERE id = $${counter} RETURNING id, is_active, latitude, longitude;
                `;

                VALUES.push(id);

                const updatedResource = await this.client.$queryRawUnsafe(queryUpdate, ...VALUES);

                return updatedResource as { id: string; is_active: boolean; longitude: number; latitude: number; };

            };

        } catch (error) {

            throw error;

        };

    };

    public async save(params: {
        shared: boolean;
        coordinates: {
            latitude: number;
            longitude: number;
        };
    }) {

        try {

            let columns = [];
            let placeholders = [];
            let values = [];
            let counter = 1;

            if (params.shared !== undefined) {
                columns.push(`is_active`);
                placeholders.push(`$${counter}`);
                values.push(params.shared);
                counter++;
            };

            if (params.coordinates) {
                columns.push(`coords`, `latitude`, `longitude`);
                placeholders.push(`$${counter}`, `$${counter + 1}`, `$${counter + 2}`);
                values.push(
                    JSON.stringify({ type: "Point", coordinates: [params.coordinates.longitude, params.coordinates.latitude] }),
                    params.coordinates.latitude,
                    params.coordinates.longitude
                );

                counter += 3;

            };

            if (columns.length > 0) {
                const query = `
                    INSERT INTO "Point" (${columns.join(', ')}) 
                    VALUES (${placeholders.join(', ')}) 
                    RETURNING id, is_active, latitude, longitude;
                `;

                const result = await this.client.$queryRawUnsafe(query, ...values);

                return result as { id: string; is_active: boolean; longitude: number; latitude: number; };
            };

            return null;

        } catch (error) {

            throw error;

        };

    };

};