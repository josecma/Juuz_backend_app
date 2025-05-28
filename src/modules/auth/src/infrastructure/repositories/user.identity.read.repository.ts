// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class UserIdentityReadRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async findByUserId(
//         userId: string
//     ) {

//         try {

//             const res = await this.client.userIdentity.findMany(
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
//         params: {
//             identityId: string;
//             userId: string;
//         }
//     ) {

//         const {
//             identityId,
//             userId,
//         } = params;

//         try {

//             const res = await this.client.userIdentity.findUnique(
//                 {
//                     where: {
//                         identityId,
//                         userId,
//                     }
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

//     public async findIdentityOwnerId(
//         params: {
//             type: string;
//             value: string;
//         }
//     ) {

//         const {
//             type,
//             value
//         } = params;

//         try {

//             let userIdentity: {
//                 identityId: string;
//                 userId: string;
//             };

//             const res = await this.client.$transaction(
//                 async (tx) => {
//                     const identity = await tx.identity.findUnique(
//                         {
//                             where: {
//                                 type_value: {
//                                     value,
//                                     type: type.toUpperCase(),
//                                 }
//                             }
//                         }
//                     );

//                     if (identity) {
//                         userIdentity = await tx.userIdentity.findFirst(
//                             {
//                                 where: {
//                                     identityId: identity.id,
//                                 }
//                             }
//                         );
//                     };

//                     return userIdentity;

//                 }

//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };