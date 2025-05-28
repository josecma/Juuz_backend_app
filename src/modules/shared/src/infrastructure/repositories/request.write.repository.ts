// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable({})
// export default class RequestWriteRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async save(
//         params: {
//             request: {
//                 id?: string;
//                 source?: {
//                     type: string;
//                     id: string;
//                 };
//                 target?: {
//                     type: string;
//                     id: string;
//                 };
//                 channel?: {
//                     method: string;
//                     target: string;
//                 }
//                 type: string,
//             };
//         },
//     ) {

//         const {
//             request,
//         } = params;

//         try {

//             const res = await this.client.request.create(
//                 {
//                     data: request,
//                 }
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

//     // public async update(
//     //     params: {
//     //         id: string;
//     //         updateObject: {
//     //             source?: {
//     //                 type: "EMAIL" | "PLATFORM";
//     //                 value: string;
//     //             };
//     //             target?: {
//     //                 type: "EMAIL" | "PLATFORM";
//     //                 value: string;
//     //             };
//     //             type?: "JOIN";
//     //         };
//     //     },
//     // ) {

//     //     const {
//     //         id,
//     //         updateObject,
//     //     } = params;

//     //     try {

//     //         const res = await this.client.request.update(
//     //             {
//     //                 where: {
//     //                     id,
//     //                 },
//     //                 data: updateObject,
//     //             }
//     //         );

//     //         return res;

//     //     } catch (error) {

//     //         throw error;

//     //     };

//     // };

// };