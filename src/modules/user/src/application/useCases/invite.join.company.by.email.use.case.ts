// import { Injectable, Logger, NotFoundException } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";
// import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
// import HandlebarsAdapter from "src/modules/shared/src/infrastructure/adapters/handlebars.adapter";
// import NodemailerAdapter from "src/modules/shared/src/infrastructure/adapters/nodemailer.adapter";
// import FindCompanyByOwnerIdAdapter from "../../infrastructure/adapters/find.company.by.owner.id.adapter";
// import RequestAdapter from "../../infrastructure/adapters/request.adapter";
// import JoinCompanyRequestWriteRepository from "../../infrastructure/repositories/join.company.request.write.repository";
// import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

// @Injectable({})
// export default class InviteJoinCompanyByEmailUseCase {

//     private readonly logger = new Logger(InviteJoinCompanyByEmailUseCase.name);

//     public constructor(
//         private readonly userReadRepository: UserReadRepository,
//         private readonly findCompanyByOwnerIdAdapter: FindCompanyByOwnerIdAdapter,
//         private readonly requestAdapter: RequestAdapter,
//         private readonly joinCompanyRequestWriteRepository: JoinCompanyRequestWriteRepository,
//         private readonly nodemailerAdapter: NodemailerAdapter,
//         private readonly handlebarsAdapter: HandlebarsAdapter,
//         private readonly userIdentityReadRepository: UserIdentityReadRepository,
//         private readonly jwtService: JwtService,
//         private readonly configService: ConfigService,
//     ) { };

//     public async execute(
//         params: {
//             inviterId: string;
//             email: string;
//             role: string;
//         }
//     ) {

//         const {
//             inviterId,
//             email,
//             role,
//         } = params;

//         try {

//             const inviter = await this.userReadRepository.findOneById(
//                 inviterId
//             );

//             if (!inviter) {
//                 throw new NotFoundException(
//                     {
//                         message: `user not found`,
//                         source: `${InviteJoinCompanyByEmailUseCase.name}`,
//                     }
//                 );
//             };

//             const company = await this.findCompanyByOwnerIdAdapter.find(
//                 inviterId
//             );

//             if (!company) {
//                 throw new NotFoundDomainException(
//                     {
//                         message: `company not found`,
//                         source: `${InviteJoinCompanyByEmailUseCase.name}`,
//                     }
//                 );
//             };

//             const request = await this.requestAdapter.create(
//                 {
//                     request: {
//                         source: {
//                             type: "USER",
//                             id: inviterId,
//                         },
//                         channel: {
//                             method: 'EAMIL',
//                             target: email,
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

//             const identityOwnerId = await this.userIdentityReadRepository.findIdentityOwnerId(
//                 {
//                     type: "EMAIL",
//                     value: email,
//                 }
//             );

//             const invitee = await this.userReadRepository.findOneById(identityOwnerId.userId);

//             const token = await this.jwtService.signAsync(
//                 {
//                     email,
//                     joinCompanyRequestId: joinCompanyRequest.id,
//                     memberId: invitee.id,
//                 },
//                 {
//                     secret: this.configService.get<string>('SECRET'),
//                 }
//             );

//             const template = this.handlebarsAdapter.compile(
//                 {
//                     templatesDir: "./src/modules/user/src/presentation/templates",
//                     templateName:
//                         invitee
//                             ?
//                             "system.user.join.company.template"
//                             :
//                             "system.user.join.company.template",
//                     data: {
//                         inviteeName: `${invitee?.firstName} ${invitee?.lastName}`,
//                         inviterName: `${inviter.firstName} ${inviter.lastName}`,
//                         companyName: company.name,
//                         platformName: 'juuz',
//                         platformDomain: 'juuz.com',
//                         role,
//                         token,
//                         currentYear: new Date().getFullYear(),
//                         platformLink: 'https://dev.juuz.io',
//                     }
//                 }
//             );

//             await this.nodemailerAdapter.send(
//                 {
//                     to: [email],
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