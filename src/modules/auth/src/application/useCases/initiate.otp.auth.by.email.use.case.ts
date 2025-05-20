import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import HandlebarsAdapter from "src/modules/shared/src/infrastructure/adapters/handlebars.adapter";
import NodemailerAdapter from "src/modules/shared/src/infrastructure/adapters/nodemailer.adapter";
import { AuthMethodEnum } from "../../domain/enums/auth.method.enum";
import { AuthNProcessStatusEnum } from "../../domain/enums/auth.process.status.enum";
import FindEmailOwnerAdapter from "../../infrastructure/adapters/find.email.owner.adapter";
import TotpAdapter from "../../infrastructure/adapters/totp.adapter";
import AuthProcessReadRepository from "../../infrastructure/repositories/auth.process.read.repository";
import AuthProcessWriteRepository from "../../infrastructure/repositories/auth.process.write.repository";
import UserAuthProcessWriteRepository from "../../infrastructure/repositories/user.auth.process.write.repository";

@Injectable({})
export default class InitiateOtpAuthByEmailUseCase {

    private readonly logger = new Logger(InitiateOtpAuthByEmailUseCase.name);

    public constructor(
        private readonly nodemailerAdapter: NodemailerAdapter,
        private readonly handlebarsAdapter: HandlebarsAdapter,
        private readonly totpAdapter: TotpAdapter,
        private readonly configService: ConfigService,
        private readonly userAuthProcessWriteRepository: UserAuthProcessWriteRepository,
        private readonly authProcessWriteRepository: AuthProcessWriteRepository,
        private readonly authProcessReadRepository: AuthProcessReadRepository,
        private readonly findEmailOwnerAdapter: FindEmailOwnerAdapter,
    ) { };

    public async execute(
        email: string
    ) {

        let metadata: Record<string, unknown> = {};

        metadata.email = email;

        try {

            const emailOwner = await this.findEmailOwnerAdapter.find(email);

            const secret = !emailOwner
                ?
                this.configService.get<string>('SECRET')
                :
                emailOwner.otpSecret;

            const otp = this.totpAdapter.generateToken({ secret });

            const pendingTOTPAuthNProcessByEmail = await this.authProcessReadRepository.findPendingOtpAuthByEmail(
                {
                    method: AuthMethodEnum.TOTP,
                    email
                }
            );

            if (pendingTOTPAuthNProcessByEmail) {

                await this.authProcessWriteRepository.update(
                    {
                        id: pendingTOTPAuthNProcessByEmail.id,
                        updateObject: {
                            status: AuthNProcessStatusEnum.FAILED,
                        },
                    }
                );

            };

            const authnProcess = await this.authProcessWriteRepository.save(
                {
                    method: AuthMethodEnum.TOTP,
                    metadata,
                }
            );

            if (emailOwner) {

                await this.userAuthProcessWriteRepository.save(
                    {
                        authNProcessId: authnProcess.id,
                        userId: emailOwner.id,
                    }
                );

            };

            const date = new Date();

            const time = [
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            ].map(num => String(num).padStart(2, '0')).join(':');

            const template = this.handlebarsAdapter.compile(
                {
                    templatesDir: "./src/modules/auth/src/presentation/templates",
                    templateName: "welcome.template",
                    data: {
                        userName: '',
                        platformName: 'juuz',
                        key: otp,
                        loginTime: time,
                        platformDomain: 'juuz.com',
                        currentYear: new Date().getFullYear(),
                        platformLink: 'https://dev.juuz.io/login/verify',
                        expirationTime: 5,
                    }
                }
            );

            await this.nodemailerAdapter.send(
                {
                    to: [email],
                    subject: 'Authentication',
                    text: '',
                    template,
                }
            );

            return authnProcess;

        } catch (error) {

            this.logger.error(error);

            throw error;

        };

    };

};