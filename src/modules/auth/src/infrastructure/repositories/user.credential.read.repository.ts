// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class UserCredentialReadRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async findByUserId(
//         userId: string
//     ) {

//         try {

//             const res = await this.client.userCredential.findMany(
//                 {
//                     where: {
//                         userId,
//                     }
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

//     public async findOneBy(
//         userId: string,
//     ) {

//         try {

//             const res = await this.client.userCredential.findFirst(
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