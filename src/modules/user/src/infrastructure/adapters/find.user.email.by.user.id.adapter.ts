// import { Injectable } from "@nestjs/common";
// import FindUserIdentityUseCase from "src/modules/auth/src/application/useCases/find.user.identity.use.case";

// @Injectable({})
// export default class FindUserEmailByUserIdAdapter {

//     public constructor(
//         private readonly findUserIdentityUseCase: FindUserIdentityUseCase
//     ) { };

//     public async find(
//         userId: string
//     ) {

//         try {

//             const userIdentities = await this.findUserIdentityUseCase.execute(userId);

//             const emailIdentity = userIdentities.find(
//                 (userIdentity) => userIdentity.type === "EMAIL"
//             );

//             return emailIdentity;

//         } catch (error) {

//             throw error;

//         };

//     };

// };