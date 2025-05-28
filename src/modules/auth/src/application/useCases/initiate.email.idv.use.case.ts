// import { Inject, Injectable } from "@nestjs/common";
// import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
// import HandlebarsAdapter from "src/modules/shared/src/infrastructure/adapters/handlebars.adapter";
// import NodemailerAdapter from "src/modules/shared/src/infrastructure/adapters/nodemailer.adapter";
// import FindUserByIdAdapter from "../../infrastructure/adapters/find.user.by.id.adapter";
// import TotpAdapter from "../../infrastructure/adapters/totp.adapter";
// import IdentityReadRepository from "../../infrastructure/repositories/identity.read.repository";
// import IdvWriteRepository from "../../infrastructure/repositories/idv.write.repository";
// import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
// import GetUserOtpSecretUseCase from "./get.user.otp.secret.use.case";

// @Injectable({})
// export default class InitiateEmailIdvUseCase {

//     public constructor(
//         @Inject(IdentityReadRepository)
//         private readonly identityReadRepository: IdentityReadRepository,
//         @Inject(UserIdentityReadRepository)
//         private readonly userIdentityReadRepository: UserIdentityReadRepository,
//         @Inject(FindUserByIdAdapter)
//         private readonly findUserByIdAdapter: FindUserByIdAdapter,
//         @Inject(NodemailerAdapter)
//         private readonly nodemailerAdapter: NodemailerAdapter,
//         @Inject(HandlebarsAdapter)
//         private readonly handlebarsAdapter: HandlebarsAdapter,
//         @Inject(GetUserOtpSecretUseCase)
//         private readonly getUserOtpSecretUseCase: GetUserOtpSecretUseCase,
//         @Inject(TotpAdapter)
//         private readonly totpAdapter: TotpAdapter,
//         @Inject(IdvWriteRepository)
//         private readonly idvWriteRepository: IdvWriteRepository,
//     ) { };

//     public async execute(
//         params: {
//             userId: string;
//             email: string;
//         },
//     ) {

//         const {
//             userId,
//             email,
//         } = params;

//         try {

//             const identityToVerify = await this.identityReadRepository.findOneBy(
//                 {
//                     type: 'EMAIL',
//                     value: email,
//                 }
//             );

//             if (!identityToVerify) {

//                 throw new NotFoundDomainException(
//                     {
//                         source: `${InitiateEmailIdvUseCase.name}`,
//                         message: `identity not found`,
//                     }
//                 );

//             };

//             const userIdentity = await this.userIdentityReadRepository.findOneBy(
//                 {
//                     userId,
//                     identityId: identityToVerify.id,
//                 }
//             );

//             if (!userIdentity) {

//                 throw new NotFoundDomainException(
//                     {
//                         source: `${InitiateEmailIdvUseCase.name}`,
//                         message: `identity not found`,
//                     }
//                 );

//             };

//             await this.idvWriteRepository.save(identityToVerify.id);

//             const user = await this.findUserByIdAdapter.find(userIdentity.userId);

//             const otpSecret = await this.getUserOtpSecretUseCase.get(userIdentity.userId);

//             const otp = this.totpAdapter.generateToken({ secret: otpSecret.secret });

//             const date = new Date();

//             const time = [
//                 date.getHours(),
//                 date.getMinutes(),
//                 date.getSeconds()
//             ].map(num => String(num).padStart(2, '0')).join(':');

//             const template = this.handlebarsAdapter.compile(
//                 {
//                     templatesDir: "./src/modules/auth/src/presentation/templates",
//                     templateName: "idv.template",
//                     data: {
//                         userName: `${user.firstName} ${user.lastName}`,
//                         platformName: 'juuz',
//                         identity: identityToVerify.value,
//                         verificationCode: otp,
//                         requestTime: time,
//                         platformDomain: 'juuz.com',
//                         currentYear: new Date().getFullYear(),
//                         expirationTime: 5,
//                     }
//                 }
//             );

//             await this.nodemailerAdapter.send(
//                 {
//                     to: [email],
//                     subject: 'identity verification',
//                     text: '',
//                     template,
//                 }
//             );

//         } catch (error) {

//             throw error;

//         };

//     };

// };