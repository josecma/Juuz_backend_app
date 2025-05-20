// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class KeyReadRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async findOneById(
//         keyId: string,
//     ) {

//         try {

//             const res = await this.client.key.findUnique(
//                 {
//                     where: {
//                         id: keyId,
//                     }
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };