// import { Inject, Injectable } from "@nestjs/common";
// import CreateIdvService from "src/modules/auth/src/domain/services/create.idv.service";

// @Injectable()
// export default class StartIdvAdapter {

//     public constructor(
//         @Inject(CreateIdvService)
//         private createIdvService: CreateIdvService,
//     ) { };

//     public async start(
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

//             const identity = await this.createIdvService.create(
//                 {
//                     type,
//                     value,
//                 }
//             );

//             return identity;

//         } catch (error) {

//             throw error;

//         };

//     };

// };