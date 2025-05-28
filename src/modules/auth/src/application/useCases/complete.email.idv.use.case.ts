// import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
// import { ThrottlerException } from "@nestjs/throttler";
// import FindUserByIdAdapter from "../../infrastructure/adapters/find.user.by.id.adapter";
// import TotpAdapter from "../../infrastructure/adapters/totp.adapter";
// import IdentityReadRepository from "../../infrastructure/repositories/identity.read.repository";
// import IdvReadRepository from "../../infrastructure/repositories/idv.read.repository";
// import IdvWriteRepository from "../../infrastructure/repositories/idv.write.repository";
// import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
// import GetUserOtpSecretUseCase from "./get.user.otp.secret.use.case";
// import UserIdentityWriteRepository from "../../infrastructure/repositories/user.identity.write.repository";
// import IdentityWriteRepository from "../../infrastructure/repositories/identity.write.repository";

// @Injectable({})
// export default class CompleteEmailIdvUseCase {

//     private readonly logger = new Logger(CompleteEmailIdvUseCase.name);

//     public constructor(
//         @Inject(TotpAdapter)
//         private readonly totpAdapter: TotpAdapter,
//         @Inject(GetUserOtpSecretUseCase)
//         private readonly getUserOtpSecretUseCase: GetUserOtpSecretUseCase,
//         @Inject(IdvWriteRepository)
//         private readonly idvWriteRepository: IdvWriteRepository,
//         @Inject(IdvReadRepository)
//         private readonly idvReadRepository: IdvReadRepository,
//         @Inject(IdentityReadRepository)
//         private readonly identityReadRepository: IdentityReadRepository,
//         @Inject(IdentityWriteRepository)
//         private readonly identityWriteRepository: IdentityWriteRepository,
//         @Inject(UserIdentityReadRepository)
//         private readonly userIdentityReadRepository: UserIdentityReadRepository,
//         @Inject(FindUserByIdAdapter)
//         private readonly findUserByIdAdapter: FindUserByIdAdapter,
//     ) { };

//     public async execute(
//         params: {
//             userId: string;
//             email: string;
//             key: string;
//         },
//     ) {

//         const {
//             userId,
//             email,
//             key,
//         } = params;

//         let secret: string;

//         try {

//             const user = await this.findUserByIdAdapter.find(userId);

//             if (!user) {
//                 throw new NotFoundException(
//                     {
//                         source: `${CompleteEmailIdvUseCase.name}`,
//                         message: 'user not found',
//                     }
//                 );
//             };

//             const identity = await this.identityReadRepository.findOneBy(
//                 {
//                     type: "EMAIL",
//                     value: email,
//                 }
//             );

//             if (!identity) {
//                 throw new NotFoundException(
//                     {
//                         source: `${CompleteEmailIdvUseCase.name}`,
//                         message: 'identity not found',
//                     }
//                 );
//             };

//             const userIdentities = await this.userIdentityReadRepository.findByUserId(userId);

//             const findIdentity = userIdentities.find(
//                 (userIdentity) => userIdentity.identityId === identity.id
//             );

//             if (!findIdentity) {
//                 throw new NotFoundException(
//                     {
//                         source: `${CompleteEmailIdvUseCase.name}`,
//                         message: 'identity not found',
//                     }
//                 );
//             };

//             const idvPending = await this.idvReadRepository.findPending(identity.id);

//             if (!(idvPending.attempts < 3)) {

//                 await this.idvWriteRepository.update(
//                     {
//                         id: idvPending.id,
//                         updateObject: {
//                             status: 'FAILED',
//                         }
//                     }
//                 );

//                 throw new ThrottlerException('you have exceeded the maximum number of attempts allowed');

//             };

//             const userOtpSecret = await this.getUserOtpSecretUseCase.get(userId);

//             secret = userOtpSecret.secret;

//             if (!(this.totpAdapter.verifyToken({ secret, token: key }))) {

//                 await this.idvWriteRepository.update({
//                     id: idvPending.id,
//                     updateObject: {
//                         attempts: idvPending.attempts + 1,
//                     }
//                 });

//                 throw new BadRequestException(
//                     {
//                         source: `${CompleteEmailIdvUseCase.name}`,
//                         message: 'not valid key'
//                     }
//                 );
//             };

//             await this.idvWriteRepository.update({
//                 id: idvPending.id,
//                 updateObject: {
//                     status: 'SUCCESS',
//                 }
//             });

//             await this.identityWriteRepository.update(
//                 {
//                     id: identity.id,
//                     updateObject: {
//                         verified: true,
//                     }
//                 }
//             );

//             return {
//                 message: 'idv completed successfully',
//             };

//         } catch (error) {

//             this.logger.error(error);
//             throw error;

//         };

//     };

// };