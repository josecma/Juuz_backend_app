// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable({})
// export default class OutboxRequestRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async findPending() {

//         try {

//             const res = await this.client.outboxRequestEvent.findMany(
//                 {
//                     where: {
//                         status: "PENDING"
//                     },
//                 },
//             );
// /
//             return res;

//         } catch (error) {

//             throw error;

//         };
//     };

//     public async markAsPublished(
//         params: {
//             id: string;
//         },
//     ) {

//         const {
//             id,
//         } = params;

//         try {

//             await this.client.outboxRequestEvent.update(
//                 {
//                     where: {
//                         id
//                     },
//                     data: {
//                         status: "PUBLISHED",
//                     },
//                 },
//             );

//         } catch (error) {

//             throw error;

//         };
//     };

// };