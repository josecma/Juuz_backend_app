// import { Inject, Injectable } from "@nestjs/common";
// // import CreateUserCredentialUseCase from "src/modules/auth/src/application/useCases/create.user.credential.use.case";

// @Injectable({})
// export default class CreateUserCredentialAdapter {

//     public constructor(
//         @Inject(CreateUserCredentialUseCase)
//         private createUserCredentialUseCase: CreateUserCredentialUseCase,
//     ) { };

//     public async create(
//         params: {
//             userId: string;
//             password: string;
//         },
//     ) {

//         const {
//             password,
//             userId,
//         } = params;

//         try {

//             const res = await this.createUserCredentialUseCase.create(
//                 {
//                     userId,
//                     password,
//                 }
//             );

//             return res;

//         } catch (error) {

//             throw error;

//         };

//     };

// };