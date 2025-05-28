// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable({})
// export default class RequestReadRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async findOneById(
//         requestId: string
//     ) {

//         try {

//             const res = await this.client.request.findUnique(
//                 {
//                     where: {
//                         id: requestId,
//                     }
//                 }
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };