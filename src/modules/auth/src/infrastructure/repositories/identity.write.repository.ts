// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";
// import IdentityMapper from "../mappers/identity.mapper";

// @Injectable()
// export default class IdentityWriteRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async save(
//         identity: {
//             type: string;
//             value: string;
//         },
//     ) {

//         const {
//             type,
//             value,
//         } = identity;

//         try {

//             const res = await this.client.identity.create(
//                 {
//                     data: {
//                         type: type.toUpperCase(),
//                         value,
//                     },
//                 },
//             );

//             return res ? IdentityMapper.to(res) : null;

//         } catch (error) {

//             throw error;

//         };

//     };

//     public async update(
//         params: {
//             id: string;
//             updateObject: {
//                 verified?: boolean;
//             };
//         },
//     ) {

//         const {
//             id,
//             updateObject,
//         } = params;

//         try {

//             const res = await this.client.identity.update(
//                 {
//                     where: {
//                         id
//                     },
//                     data: updateObject,
//                 },
//             );

//             return res ? IdentityMapper.to(res) : null;

//         } catch (error) {

//             throw error;

//         };

//     };

// };