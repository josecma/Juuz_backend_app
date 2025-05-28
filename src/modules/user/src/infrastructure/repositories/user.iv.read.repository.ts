// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class UserIdentityVerificationReadRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async findPending(
//         identityId: string,
//     ) {

//         try {

//             const res = await this.client.userIdentityVerification.findMany(
//                 {
//                     where: {
//                         identityId,
//                         status: "PENDING",
//                     }
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };