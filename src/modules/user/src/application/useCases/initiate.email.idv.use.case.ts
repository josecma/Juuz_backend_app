import { Injectable } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import HandlebarsAdapter from "src/modules/shared/src/infrastructure/adapters/handlebars.adapter";
import NodemailerAdapter from "src/modules/shared/src/infrastructure/adapters/nodemailer.adapter";
import { IdentityEnum } from "../../domain/enums/identity.enum";
import GetUserOtpSecretService from "../../domain/services/get.user.otp.secret.service";
import TotpAdapter from "../../infrastructure/adapters/totp.adapter";
import IdvWriteRepository from "../../infrastructure/repositories/idv.write.repository";
import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

@Injectable({})
export default class InitiateEmailIdvUseCase {

    public constructor(
        private readonly userIdentityReadRepository: UserIdentityReadRepository,
        private readonly userReadRepository: UserReadRepository,
        private readonly nodemailerAdapter: NodemailerAdapter,
        private readonly handlebarsAdapter: HandlebarsAdapter,
        private readonly getUserOtpSecretService: GetUserOtpSecretService,
        private readonly totpAdapter: TotpAdapter,
        private readonly idvWriteRepository: IdvWriteRepository,
    ) { };

    public async execute(
        params: {
            userId: string,
            email: string,
        },
    ) {

        const {
            userId,
            email,
        } = params;

        try {

            const identityToVerify = await this.userIdentityReadRepository.findOneBy(
                {
                    type: IdentityEnum.EMAIL,
                    value: email,
                }
            );

            if (!identityToVerify) {

                throw new NotFoundDomainException(
                    {
                        source: `${InitiateEmailIdvUseCase.name}`,
                        message: `identity not found`,
                    }
                );

            };

            if (identityToVerify.userId !== userId) {

                throw new NotFoundDomainException(
                    {
                        source: `${InitiateEmailIdvUseCase.name}`,
                        message: `identity not found`,
                    }
                );

            };

            await this.idvWriteRepository.save(identityToVerify.id);

            const user = await this.userReadRepository.findOneById(userId);

            const otpSecret = await this.getUserOtpSecretService.get(userId);

            const otp = this.totpAdapter.generateToken({ secret: otpSecret.secret });

            const date = new Date();

            const time = [
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            ].map(num => String(num).padStart(2, '0')).join(':');

            const template = this.handlebarsAdapter.compile(
                {
                    templatesDir: "./src/modules/auth/src/presentation/templates",
                    templateName: "idv.template",
                    data: {
                        userName: `${user.firstName} ${user.lastName}`,
                        platformName: 'juuz',
                        identity: identityToVerify.value,
                        verificationCode: otp,
                        requestTime: time,
                        platformDomain: 'juuz.com',
                        currentYear: new Date().getFullYear(),
                        expirationTime: 5,
                    }
                }
            );

            await this.nodemailerAdapter.send(
                {
                    to: [email],
                    subject: 'identity verification',
                    text: '',
                    template,
                }
            );

        } catch (error) {

            throw error;

        };

    };

};