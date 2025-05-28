// import { Injectable } from "@nestjs/common";
// import IdentityReadRepository from "../../infrastructure/repositories/identity.read.repository";
// import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";

// @Injectable({})
// export default class FindUserIdentityUseCase {

//     public constructor(
//         private readonly identityReadRepository: IdentityReadRepository,
//         private readonly userIdentityReadRepository: UserIdentityReadRepository,
//     ) { };

//     public async execute(
//         userId: string
//     ) {

//         try {

//             const userIdentities = await this.userIdentityReadRepository.findByUserId(userId);

//             const identities = await this.identityReadRepository.findSet(
//                 userIdentities.map((userIdentity) => userIdentity.identityId)
//             );

//             return identities;

//         } catch (error) {

//             throw error;

//         };

//     };

// };