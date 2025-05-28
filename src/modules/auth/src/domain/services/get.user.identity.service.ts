// import { Inject, Injectable } from "@nestjs/common";
// import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
// import UserIdentityWriteRepository from "../../infrastructure/repositories/user.identity.write.repository";
// import UserIdentity from "../entities/identity";

// @Injectable({})
// export default class GetUserIdentityService {

//     public constructor(
//         @Inject(UserIdentityWriteRepository)
//         private readonly userIdentityWriteRepository: UserIdentityWriteRepository,
//         @Inject(UserIdentityReadRepository)
//         private readonly userIdentityReadRepository: UserIdentityReadRepository,
//     ) { };

//     public async create(
//         params: {
//             userId: string;
//             identity: {
//                 type: string;
//                 value: string;
//             };
//         },
//     ) {

//         const {
//             userId,
//             identity,
//         } = params;

//         const {
//             type,
//             value,
//         } = identity;

//         try {

//             let createdIdentity: UserIdentity;

//             createdIdentity = await this.userIdentityReadRepository.findOneByUserId(
//                 {
//                     userId,
//                     type,
//                     value,
//                 }
//             );

//             if (!createdIdentity) {

//                 createdIdentity = await this.userIdentityWriteRepository.save(
//                     {
//                         userId,
//                         identity,
//                     }
//                 );

//             };

//             return createdIdentity;

//         } catch (error) {

//             throw error;

//         };

//     };

// };