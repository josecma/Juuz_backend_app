// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class UserIdentityVerificationWriteRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async save(
//         params: {
//             identityId: string;
//             keyId: string;
//         },
//     ) {

//         const {
//             identityId,
//             keyId,
//         } = params;

//         try {

//             const res = await this.client.identityVerification.create(
//                 {
//                     data: {
//                         identityId,
//                         keyId,
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
//                 status?: string;
//             };
//         },
//     ) {

//         const {
//             id,
//             updateObject,
//         } = params;

//         try {

//             const res = await this.client.identityVerification.update(
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