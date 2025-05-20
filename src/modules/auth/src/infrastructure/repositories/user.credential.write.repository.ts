// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class UserCredentialWriteRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async save(
//         params: {
//             userId: string;
//             password: string;
//         },
//     ) {

//         const {
//             userId,
//             password,
//         } = params;

//         try {

//             const res = await this.client.userCredential.create(
//                 {
//                     data: {
//                         userId,
//                         password,
//                     },
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };