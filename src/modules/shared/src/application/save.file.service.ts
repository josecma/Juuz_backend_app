// import { Inject, Injectable } from "@nestjs/common";
// import File from "../domain/file";
// import IStorageProvider from "../domain/infrastructure/i.storage.provider";

// @Injectable()
// export default class SaveFileService {

//     public constructor(
//         @Inject()
//         private readonly storageProvider: IStorageProvider,
//     ) { };

//     public async execute(params: {
//         fileName: string;
//         key: string;
//         size: number;
//         mimeType: string;
//         metadata?: Record<string, any>;
//     }[]) {

//         try {

//             const newFiles = params.map((file) => new File(file));

//             await this.storageProvider.uploadFiles(newFiles);

//         } catch (error) {

//             console.error(error);

//         };

//     };

// };