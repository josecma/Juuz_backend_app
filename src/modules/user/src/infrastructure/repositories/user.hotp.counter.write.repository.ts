// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class UserHotpCounterWriteRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async save(
//         params: {
//             userOtpSecretId: string;
//             counter: number;
//         },
//     ) {

//         const {
//             userOtpSecretId,
//             counter,
//         } = params;

//         try {

//             const res = await this.client.userHotpCounter.create(
//                 {
//                     data: {
//                         userOtpSecretId,
//                         counter,
//                     },
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

//     public async update(
//         params: {
//             id: string;
//             updateObject: {
//                 counter?: number;
//             };
//         },
//     ) {

//         const {
//             id,
//             updateObject,
//         } = params;

//         try {

//             const res = await this.client.userHotpCounter.update(
//                 {
//                     where: {
//                         id
//                     },
//                     data: updateObject,
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };