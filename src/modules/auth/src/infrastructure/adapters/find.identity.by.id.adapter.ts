// import { Inject, Injectable } from "@nestjs/common";
// import UserReadRepository from "src/modules/user/src/infrastructure/repositories/user.read.repository";
// import UserIdentityReadRepository from "../repositories/user.identity.read.repository";

// @Injectable()
// export default class FindIdentityByIdAdapter {

//     public constructor(
//         @Inject(UserIdentityReadRepository)
//         private readonly userIdentityReadRepository: UserIdentityReadRepository,
//     ) { };

//     public async find(
//         identityId: string
//     ) {

//         try {

//             const identity = await this.userIdentityReadRepository.findIdentityOwnerId(identityId);

//             return identity;

//         } catch (error) {

//             throw error;

//         };

//     };

// };