// import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
// import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
// import CryptoAdapter from "src/modules/shared/src/infrastructure/adapters/crypto.adapter";
// import KeyReadRepository from "../../infrastructure/repositories/key.read.repository";
// import SourceReadRepository from "../../infrastructure/repositories/source.read.repository";
// import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
// import UserIdentityWriteRepository from "../../infrastructure/repositories/user.identity.write.repository";
// import UserIdentityVerificationReadRepository from "../../infrastructure/repositories/user.iv.read.repository";
// import UserIdentityVerificationWriteRepository from "../../infrastructure/repositories/user.iv.write.repository";

// @Injectable()
// export default class CreateUserIdentityVerificationService {

//     public constructor(
//         @Inject(UserIdentityWriteRepository)
//         private readonly userIdentityWriteRepository: UserIdentityWriteRepository,
//         @Inject(UserIdentityReadRepository)
//         private readonly userIdentityReadRepository: UserIdentityReadRepository,
//         @Inject(UserIdentityVerificationReadRepository)
//         private readonly userIdentityVerificationReadRepository: UserIdentityVerificationReadRepository,
//         @Inject(UserIdentityVerificationWriteRepository)
//         private readonly userIdentityVerificationWriteRepository: UserIdentityVerificationWriteRepository,
//         @Inject(SourceReadRepository)
//         private readonly sourceReadRepository: SourceReadRepository,
//         @Inject(KeyReadRepository)
//         private readonly keyReadRepository: KeyReadRepository,
//         @Inject(CryptoAdapter)
//         private readonly cryptoAdapter: CryptoAdapter,
//     ) { };

//     public async create(
//         params: {
//             userId: string;
//             identity: {
//                 type: string;
//                 value: string;
//             };
//             key: string;
//         },
//     ) {

//         const {
//             userId,
//             identity,
//             key,
//         } = params;

//         const {
//             type,
//             value,
//         } = identity;

//         try {

//             const userIdentity = await this.userIdentityReadRepository.findOneBy(
//                 {
//                     userId,
//                     type,
//                     value,
//                 }
//             );

//             if (!userIdentity) {

//                 throw new NotFoundDomainException(
//                     {
//                         source: `${CreateUserIdentityVerificationService.name}`,
//                         message: `identity not found`,
//                     }
//                 );

//             };

//             const userIdv = await this.userIdentityVerificationReadRepository.findPending(
//                 userIdentity.id
//             );

//             await this.sourceReadRepository.findOneById(
//                 userIV.sourceId
//             );

//             const userIvkey = await this.keyReadRepository.findOneById(
//                 userIV.keyId,
//             );

//             if (key !== keyValue) {
//                 throw new UnauthorizedException(
//                     {
//                         source: `${CreateUserIdentityVerificationService.name}`,
//                         message: 'key not valid',
//                     }
//                 );
//             };

//             await this.userIdentityVerificationWriteRepository.update(
//                 {
//                     id: userIV.id,
//                     updateObject: {
//                         status: "VERIFIED"
//                     },
//                 }
//             );

//             await this.userIdentityWriteRepository.update(
//                 {
//                     id: userIV.id,
//                     updateObject: {
//                         verified: true,
//                     },
//                 }
//             );

//         } catch (error) {

//             throw error;

//         };

//     };

// };