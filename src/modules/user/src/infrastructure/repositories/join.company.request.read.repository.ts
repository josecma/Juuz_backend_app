// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable({})
// export default class JoinCompanyRequestReadRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async findOneById(
//         joinCompanyRequestId: string
//     ) {

//         try {

//             const res = await this.client.joinCompanyRequest.findUnique(
//                 {
//                     where: {
//                         id: joinCompanyRequestId,
//                     }
//                 }
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };