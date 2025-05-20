// import { Inject, Injectable } from "@nestjs/common";
// import CreateUserIdentityUseCase from "src/modules/auth/src/application/useCases/create.user.identity.use.case";

// @Injectable()
// export default class CreateUserIdentityAdapter {

//     public constructor(
//         @Inject(CreateUserIdentityUseCase)
//         private createUserIdentityUseCase: CreateUserIdentityUseCase,
//     ) { };

//     public async create(
//         params: {
//             userId: string;
//             identities: Array<
//                 {
//                     type: string;
//                     value: string;
//                 }>;
//         }
//     ) {

//         const {
//             userId,
//             identities,
//         } = params;

//         try {

//             const createdIdentities = await Promise.all(
//                 identities.map(
//                     async (identity) => {

//                         const createdIdentity = await this.createUserIdentityUseCase.execute(
//                             {
//                                 userId,
//                                 identity
//                             }
//                         );

//                         return createdIdentity;

//                     }
//                 )
//             )

//             return createdIdentities;

//         } catch (error) {

//             throw error;

//         };

//     };

// };