// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class UserOtpSecretWriteRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async save(
//         params: {
//             userId: string;
//             encryptedSecret: string;
//         },
//     ) {

//         const {
//             userId,
//             encryptedSecret
//         } = params;

//         try {

//             const res = await this.client.secret.create(
//                 {
//                     data: {
//                         userId,
//                         secret: encryptedSecret,
//                     },
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };