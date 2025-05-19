// import { Inject, Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// @Injectable({})
// export default class StorageRepository {

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//     ) { };

//     public async save(
//         params: {
//             key: string;
//             size: number;
//             mimeType: string;
//             evidenceId: number;
//             metadata: Record<string, any>;
//         }[]
//     ): Promise<void> {

//         try {

//             await this.client.file.createMany({ data: {
//                 key,
//                 metadata,
//                 mimeType
//             } });

//         } catch (error) {

//             throw error;

//         };

//     };

// };