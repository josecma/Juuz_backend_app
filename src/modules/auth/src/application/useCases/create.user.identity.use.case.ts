// import { ConflictException, Inject, Injectable } from "@nestjs/common";
// import IdentityReadRepository from "../../infrastructure/repositories/identity.read.repository";
// import IdentityWriteRepository from "../../infrastructure/repositories/identity.write.repository";
// import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
// import UserIdentityWriteRepository from "../../infrastructure/repositories/user.identity.write.repository";

// @Injectable({})
// export default class CreateUserIdentityUseCase {

//     public constructor(
//         @Inject(IdentityWriteRepository)
//         private readonly identityWriteRepository: IdentityWriteRepository,
//         @Inject(IdentityReadRepository)
//         private readonly identityReadRepository: IdentityReadRepository,
//         @Inject(UserIdentityWriteRepository)
//         private readonly userIdentityWriteRepository: UserIdentityWriteRepository,
//         @Inject(UserIdentityReadRepository)
//         private readonly userIdentityReadRepository: UserIdentityReadRepository,
//     ) { };

//     public async execute(
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

//             const savedIdentity = await this.identityReadRepository.findOneBy(
//                 {
//                     type,
//                     value,
//                 }
//             );

//             if (savedIdentity) {
//                 throw new ConflictException(
//                     {
//                         source: `${CreateUserIdentityUseCase.name}`,
//                         message: 'identity already exists',
//                     }
//                 );
//             };

//             const createdIdentity = await this.identityWriteRepository.save(
//                 {
//                     type,
//                     value,
//                 }
//             );

//             await this.userIdentityWriteRepository.save(
//                 {
//                     userId,
//                     identityId: createdIdentity.id,
//                 }
//             );

//             return createdIdentity;

//         } catch (error) {

//             throw error;

//         };

//     };

// };