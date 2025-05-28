// import { Inject, Injectable, Logger } from "@nestjs/common";
// import EmailPort from "src/modules/shared/src/application/ports/email.port";
// import TemplateEnginePort from "src/modules/shared/src/application/ports/template.engine.port";
// import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
// import HandlebarsAdapter from "src/modules/shared/src/infrastructure/adapters/handlebars.adapter";
// import NodemailerAdapter from "src/modules/shared/src/infrastructure/adapters/nodemailer.adapter";
// import FindOneUserByIdService from "../../domain/services/find.one.user.by.id.service";
// import FindCompanyByOwnerIdAdapter from "../../infrastructure/adapters/find.company.by.owner.id.adapter";
// import FindUserEmailByUserIdAdapter from "../../infrastructure/adapters/find.user.email.by.user.id.adapter";
// import RequestAdapter from "../../infrastructure/adapters/request.adapter";
// import JoinCompanyRequestWriteRepository from "../../infrastructure/repositories/join.company.request.write.repository";
// import FindCompanyByOwnerIdPort from "../ports/find.company.by.owner.id.port";

// @Injectable({})
// export default class InviteJoinCompanyUseCase {

//     private readonly logger = new Logger(InviteJoinCompanyUseCase.name);

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
//         private readonly requestAdapter: RequestAdapter,
//         private readonly findUserEmailByUserIdAdapter: FindUserEmailByUserIdAdapter,
//     ) { };

//     public async execute(
//         params: {
//             inviterId: string;
//             inviteeId: string;
//             role: string;
//         },
//     ) {

//         const {
//             inviterId,
//             inviteeId,
//             role,
//         } = params;

//         try {

//             const inviter = await this.findOneUserByIdService.find(
//                 {
//                     id: inviterId,
//                 }
//             );

//             const company = await this.findCompanyByOwnerIdAdapter.find(
//                 inviterId
//             );

//             if (!company) {
//                 throw new NotFoundDomainException(
//                     {
//                         message: `company not found`,
//                         source: `${InviteJoinCompanyUseCase.name}`,
//                     }
//                 );
//             };

//             const invitee = await this.findOneUserByIdService.find(
//                 {
//                     id: inviteeId,
//                 }
//             );

//             const request = await this.requestAdapter.create(
//                 {
//                     request: {
//                         source: {
//                             type: "USER",
//                             id: inviterId,
//                         },
//                         target: {
//                             type: "USER",
//                             id: inviteeId,
//                         },
//                         type: "JOIN"
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
//                     templatesDir: "./src/modules/user/src/presentation/templates",
//                     templateName: "company.invitation.template",
//                     data: {
//                         inviteeName: `${invitee.firstName} ${invitee.lastName}`,
//                         inviterName: `${inviter.firstName} ${inviter.lastName}`,
//                         companyName: company.name,
//                         platformName: 'juuz',
//                         platformDomain: 'juuz.com',
//                         role,
//                         currentYear: new Date().getFullYear(),
//                         platformLink: 'https://dev.juuz.io',
//                     }
//                 }
//             );

//             const emailIdentity = await this.findUserEmailByUserIdAdapter.find(inviteeId);

//             await this.nodemailerAdapter.send(
//                 {
//                     to: [emailIdentity.value],
//                     subject: '¡Invitation!',
//                     text: '',
//                     template,
//                 }
//             );

//         } catch (error) {

//             this.logger.error(error);
//             throw error;

//         };

//     };

// };