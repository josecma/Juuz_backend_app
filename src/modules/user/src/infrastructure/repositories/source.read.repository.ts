// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export default class SourceReadRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async findOneById(
//         sourceId: string,
//     ) {

//         try {

//             const res = await this.client.source.findUnique(
//                 {
//                     where: {
//                         id: sourceId,
//                     }
//                 },
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };