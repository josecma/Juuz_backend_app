// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class UserOtpSecretReadRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async findUserSecret(
//         userId: string
//     ) {

//         try {

//             const res = await this.client.secret.findUnique(
//                 {
//                     where: {
//                         userId,
//                     },
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };