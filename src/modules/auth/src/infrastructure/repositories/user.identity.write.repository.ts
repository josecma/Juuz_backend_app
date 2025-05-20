// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class UserIdentityWriteRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async save(
//         params: {
//             userId: string;
//             identityId: string;
//         },
//     ) {

//         const {
//             userId,
//             identityId,
//         } = params;

//         try {

//             const res = await this.client.userIdentity.create(
//                 {
//                     data: {
//                         userId,
//                         identityId,
//                     },
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };