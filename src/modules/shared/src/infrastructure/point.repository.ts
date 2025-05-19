// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";
// import GeoJSONPoint from "../domain/valueObjects/geojson.point";

// @Injectable({})
// export default class PointRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async save(params: GeoJSONPoint) {

//         const { coordinates } = params.toJSON();

//         try {

//             const coordsAsWKT = `POINT(${coordinates[0]} ${coordinates[1]})`;

//             const queryCreate = `
//             INSERT INTO "Point" (user_id, order_id, coords, photos) 
//             VALUES ($1, $2, ST_GeomFromText($3, 4326), $4)`;

//             await this.client.$executeRawUnsafe(queryCreate, userId, orderId, coordsAsWKT, photos);

//         } catch (error) {

//             console.error(error);
//             throw error;

//         };

//     };

// };