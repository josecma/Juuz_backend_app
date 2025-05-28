// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";
// import IdentityMapper from "../mappers/identity.mapper";

// @Injectable()
// export default class IdentityReadRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async findSet(
//         ids: Array<string>
//     ) {

//         try {

//             const res = await this.client.identity.findMany(
//                 {
//                     where: {
//                         id: {
//                             in: ids
//                         },
//                     }
//                 },
//             );

//             return res.map((orm) => IdentityMapper.to(orm));

//         } catch (error) {

//             throw error;

//         };

//     };

//     public async findOneById(
//         identityId: string,
//     ) {

//         try {

//             const res = await this.client.identity.findUnique(
//                 {
//                     where: {
//                         id: identityId,
//                     }
//                 },
//             );

//             return res ? IdentityMapper.to(res) : null;

//         } catch (error) {

//             throw error;

//         };

//     };

//     public async findOneBy(
//         params: {
//             type: string;
//             value: string;
//         }
//     ) {

//         const {
//             type,
//             value,
//         } = params;

//         try {

//             const res = await this.client.identity.findUnique(
//                 {
//                     where: {
//                         type_value: {
//                             type: type.toUpperCase(),
//                             value,
//                         },
//                     }
//                 },
//             );

//             return res ? IdentityMapper.to(res) : null;

//         } catch (error) {

//             throw error;

//         };

//     };

// };