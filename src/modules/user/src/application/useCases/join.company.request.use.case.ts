// import { Inject, Injectable, Logger } from "@nestjs/common";
// import EmailPort from "src/modules/shared/src/application/ports/email.port";
// import TemplateEnginePort from "src/modules/shared/src/application/ports/template.engine.port";
// import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
// import HandlebarsAdapter from "src/modules/shared/src/infrastructure/adapters/handlebars.adapter";
// import NodemailerAdapter from "src/modules/shared/src/infrastructure/adapters/nodemailer.adapter";
// // import { UserRoleEnum } from "../../domain/enums/user.role.enum";
// import FindOneUserByIdService from "../../domain/services/find.one.user.by.id.service";
// import FindCompanyByOwnerIdAdapter from "../../infrastructure/adapters/find.company.by.owner.id.adapter";
// import RequestAdapter from "../../infrastructure/adapters/request.adapter";
// // import StartIdvAdapter from "../../infrastructure/adapters/start.idv.adapter";
// import JoinCompanyRequestWriteRepository from "../../infrastructure/repositories/join.company.request.write.repository";
// import FindCompanyByOwnerIdPort from "../ports/find.company.by.owner.id.port";
// import RequestPort from "../ports/request.port";

// @Injectable({})
// export default class JoinCompanyRequestUseCase {

//     private readonly logger = new Logger(JoinCompanyRequestUseCase.name);

//     public constructor(
//         @Inject(FindOneUserByIdService)
//         private readonly findOneUserByIdService: FindOneUserByIdService,
//         @Inject(FindCompanyByOwnerIdAdapter)
//         private readonly findCompanyByOwnerIdAdapter: FindCompanyByOwnerIdPort,
//         @Inject(NodemailerAdapter)
//         private readonly nodemailerAdapter: EmailPort,
//         @Inject(HandlebarsAdapter)
//         private readonly handlebarsAdapter: TemplateEnginePort,
//         @Inject(JoinCompanyRequestWriteRepository)
//         private readonly joinCompanyRequestWriteRepository: JoinCompanyRequestWriteRepository,
//         @Inject(RequestAdapter)
//         private readonly requestAdapter: RequestPort,
//         // @Inject(CreateIdentityAdapter)
//         // private readonly createIdentityAdapter: CreateIdentityAdapter,
//         // @Inject(StartIdvAdapter)
//         // private readonly startIdvAdapter: StartIdvAdapter,
//     ) { };

//     public async execute(
//         params: {
//             // inviterId: string;
//             // inviteeId: string;
//             sourceUserId: string;
//             targetUserId: string;
//             role: string;
//         },
//     ) {

//         const {
//             // inviterId,
//             //email,
//             // inviteeId,
//             sourceUserId,
//             targetUserId,
//             role,
//         } = params;

//         try {

//             const sourceUser = await this.findOneUserByIdService.find(
//                 {
//                     id: sourceUserId,
//                 }
//             );

//             const company = await this.findCompanyByOwnerIdAdapter.find(
//                 sou
//             );

//             if (!company) {
//                 throw new NotFoundDomainException(
//                     {
//                         message: `company not found`,
//                         source: `${JoinCompanyRequestByEmailUseCase.name}`,
//                     }
//                 );
//             };

//             const createdIdentity = await this.createIdentityAdapter.create(
//                 {

//                 }
//             );

//             const idv = await this.startIdvAdapter.start(
//                 {
//                     type: createdIdentity.type,
//                     value: createdIdentity.value
//                 }
//             );

//             const request = await this.requestAdapter.create(
//                 {
//                     request: {
//                         source: {
//                             type: "USER",
//                             id: inviterId,
//                         },
//                         channel: {
//                             method: "EMAIL",
//                             target: email
//                         },
//                         type: "IDV"
//                     }
//                 }
//             );

//             const joinCompanyRequest = await this.joinCompanyRequestWriteRepository.save(
//                 {
//                     requestId: request.id,
//                     companyId: company.id,
//                     role,
//                 }
//             );

//             const template = this.handlebarsAdapter.compile(
//                 {
//                     templatesDir: "./src/modules/shared/src/presentation/templates",
//                     templateName: "company.invitation.template",
//                     data: {
//                         //inviteeName: `${invitee.firstName} ${invitee.lastName}`,
//                         inviterName: `${inviter.firstName} ${inviter.lastName}`,
//                         inviterEmail: inviter.email,
//                         companyName: company.name,
//                         platformName: 'juuz',
//                         platformDomain: 'juuz.com',
//                         role,
//                         inviteeEmail: email,
//                         currentYear: new Date().getFullYear(),
//                         platformLink: 'https://dev.juuz.io',
//                         key: idv.key,
//                         expirationDate: '',
//                     }
//                 }
//             );

//             await this.nodemailerAdapter.send(
//                 {
//                     to: [email],
//                     subject: '¡Invitation!',
//                     text: `Hello,

//                     ${inviter.firstName} ${inviter.lastName} (${inviter.email}) has invited you to join their company on juuz as a DRIVER.

//                     INVITATION DETAILS:
//                     - Role: ${UserRoleEnum.DRIVER}
//                     - Expires: 

//                     To complete your registration, please:
//                     1. Visit our platform: https://app.juuz.com
//                     2. Use this OTP code when prompted: 123456

//                     If you didn't request this invitation or don't recognize juuz, please ignore this email or contact us at support@juuz.com.

//                     © ${new Date().getFullYear()} juuz. All rights reserved.

//                     This is an automated message, please do not reply directly to this email.`,
//                     template,
//                 }
//             );

//         } catch (error) {

//             this.logger.error(error);
//             throw error;

//         };

//     };

// };