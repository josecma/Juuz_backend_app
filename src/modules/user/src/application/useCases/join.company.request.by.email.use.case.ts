import { Inject, Injectable, Logger } from "@nestjs/common";
import EmailPort from "src/modules/shared/src/application/ports/email.port";
import HotpPort from "src/modules/shared/src/application/ports/hotp.port";
import TemplateEnginePort from "src/modules/shared/src/application/ports/template.engine.port";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import HandlebarsAdapter from "src/modules/shared/src/infrastructure/adapters/handlebars.adapter";
import HotpAdapter from "src/modules/shared/src/infrastructure/adapters/hotp.adapter";
import NodemailerAdapter from "src/modules/shared/src/infrastructure/adapters/nodemailer.adapter";
import { OtpSecretAdapter } from "src/modules/shared/src/infrastructure/adapters/otp.secret.adapter";
import UUIDAdapter from "src/modules/shared/src/infrastructure/adapters/uuid.adapter";
import { UserRoleEnum } from "../../domain/enums/user.role.enum";
import CreateUserIdentityService from "../../domain/services/create.user.identity.service";
import FindOneUserByIdService from "../../domain/services/find.one.user.by.id.service";
import GetUserHotpCounterService from "../../domain/services/get.user.hotp.counter.service";
import GetUserOtpSecretService from "../../domain/services/get.user.otp.secret.service";
import FindCompanyByOwnerIdAdapter from "../../infrastructure/adapters/find.company.by.owner.id.adapter";
import RequestAdapter from "../../infrastructure/adapters/request.adapter";
import JoinCompanyRequestWriteRepository from "../../infrastructure/repositories/join.company.request.write.repository";
import KeyWriteRepository from "../../infrastructure/repositories/key.write.repository";
import SourceWriteRepository from "../../infrastructure/repositories/source.write.repository";
import UserIdentityVerificationWriteRepository from "../../infrastructure/repositories/user.iv.write.repository";
import FindCompanyByOwnerIdPort from "../ports/find.company.by.owner.id.port";
import RequestPort from "../ports/request.port";

@Injectable({})
export default class JoinCompanyRequestByEmailUseCase {

    private readonly logger = new Logger(JoinCompanyRequestByEmailUseCase.name);

    public constructor(
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
        @Inject(FindCompanyByOwnerIdAdapter)
        private readonly findCompanyByOwnerIdAdapter: FindCompanyByOwnerIdPort,
        @Inject(NodemailerAdapter)
        private readonly nodemailerAdapter: EmailPort,
        @Inject(HandlebarsAdapter)
        private readonly handlebarsAdapter: TemplateEnginePort,
        @Inject(JoinCompanyRequestWriteRepository)
        private readonly joinCompanyRequestWriteRepository: JoinCompanyRequestWriteRepository,
        @Inject(RequestAdapter)
        private readonly requestAdapter: RequestPort,
        @Inject(CreateUserIdentityService)
        private readonly createUserIdentityService: CreateUserIdentityService,
        @Inject(HotpAdapter)
        private readonly hotpAdapter: HotpPort,
        @Inject(GetUserOtpSecretService)
        private readonly getUserOtpSecretService: GetUserOtpSecretService,
        @Inject(SourceWriteRepository)
        private readonly sourceWriteRepository: SourceWriteRepository,
        @Inject(KeyWriteRepository)
        private readonly keyWriteRepository: KeyWriteRepository,
        @Inject(GetUserHotpCounterService)
        private readonly getUserHotpCounterService: GetUserHotpCounterService,
        @Inject(OtpSecretAdapter)
        private readonly otpSecretAdapter: OtpSecretAdapter,
        @Inject(UserIdentityVerificationWriteRepository)
        private readonly userIdentityVerificationWriteRepository: UserIdentityVerificationWriteRepository,
    ) { };

    public async execute(
        params: {
            inviterId: string;
            email: string;
            as: UserRoleEnum.DRIVER;
        },
    ) {

        const {
            inviterId,
            email,
            as,
        } = params;

        try {

            const inviter = await this.findOneUserByIdService.find(
                {
                    id: inviterId,
                }
            );

            const company = await this.findCompanyByOwnerIdAdapter.find(
                inviterId
            );

            if (!company) {
                throw new NotFoundDomainException(
                    {
                        message: `the owner's company with id:${inviterId} not found`,
                        source: `${JoinCompanyRequestByEmailUseCase.name}`,
                    }
                );
            };

            const newUserIdentity = await this.createUserIdentityService.create(
                {
                    userId: UUIDAdapter.get(),
                    identity: {
                        type: "EMAIL",
                        value: email,
                    },
                }
            );

            const juuzRequest = await this.requestAdapter.create(
                {
                    request: {
                        target: {
                            type: "USER",
                            id: newUserIdentity.userId,
                        },
                        channel: {
                            method: "EMAIL",
                            target: email
                        },
                        type: "IDV"
                    }
                }
            );

            const userOtpSecret = await this.getUserOtpSecretService.get(newUserIdentity.userId);

            const hotpCounter = await this.getUserHotpCounterService.get(userOtpSecret.id);

            const newHotp = this.hotpAdapter.generateToken({ secret: userOtpSecret.secret, counter: hotpCounter });

            const newHotpKey = await this.keyWriteRepository.save({ type: "HOTP", value: newHotp });

            await this.userIdentityVerificationWriteRepository.save(
                {
                    keyId: newHotpKey.id,
                    requestId: juuzRequest.id,
                    identityId: newUserIdentity.id,
                }
            );

            const request = await this.requestAdapter.create(
                {
                    request: {
                        source: {
                            type: 'USER',
                            id: inviterId,
                        },
                        target: {
                            type: "USER",
                            id: newUserIdentity.userId,
                        },
                        channel: {
                            method: "EMAIL",
                            target: email,
                        },
                        type: "JOIN",
                    },
                },
            );

            const joinCompanyRequest = await this.joinCompanyRequestWriteRepository.save(
                {
                    requestId: request.id,
                    companyId: company.id,
                    as,
                }
            );

            const template = this.handlebarsAdapter.compile(
                {
                    templatesDir: "./src/modules/shared/src/presentation/templates",
                    templateName: "company.invitation.template",
                    data: {
                        //inviteeName: `${invitee.firstName} ${invitee.lastName}`,
                        inviterName: `${inviter.firstName} ${inviter.lastName}`,
                        inviterEmail: inviter.email,
                        companyName: company.name,
                        platformName: 'juuz',
                        platformDomain: 'juuz.com',
                        role: as,
                        inviteeEmail: email,
                        currentYear: new Date().getFullYear(),
                        platformLink: 'https://dev.juuz.io',
                        key: newHotpKey.value,
                        expirationDate: '',
                    }
                }
            );

            await this.nodemailerAdapter.send(
                {
                    to: [email],
                    subject: '¡Invitation!',
                    text: `Hello,

                    ${inviter.firstName} ${inviter.lastName} (${inviter.email}) has invited you to join their company on juuz as a DRIVER.

                    INVITATION DETAILS:
                    - Role: ${UserRoleEnum.DRIVER}
                    - Expires: 

                    To complete your registration, please:
                    1. Visit our platform: https://app.juuz.com
                    2. Use this OTP code when prompted: 123456

                    If you didn't request this invitation or don't recognize juuz, please ignore this email or contact us at support@juuz.com.

                    © ${new Date().getFullYear()} juuz. All rights reserved.

                    This is an automated message, please do not reply directly to this email.`,
                    template,
                }
            );

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

};