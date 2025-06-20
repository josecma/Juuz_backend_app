import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CompanyMemberRoleEnum } from "src/modules/company/src/domain/enums/company.member.role.enum";
import HandlebarsAdapter from "src/modules/shared/src/infrastructure/adapters/handlebars.adapter";
import NodemailerAdapter from "src/modules/shared/src/infrastructure/adapters/nodemailer.adapter";
import { CompanyInvitationRequestStatusEnum } from "../../domain/enums/company.invitation.request.status.enum";
import FindUserByEmailService from "../../domain/services/find.user.by.email.service";
import FindCompanyByOwnerIdAdapter from "../../infrastructure/adapters/find.company.by.owner.id.adapter";
import CompanyInvitationRequestWriteRepository from "../../infrastructure/repositories/company.invitation.request.write.repository";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

@Injectable()
export default class InviteUserToCompanyUseCase {

    private readonly logger = new Logger(InviteUserToCompanyUseCase.name);

    public constructor(
        private readonly userReadRepository: UserReadRepository,
        private readonly findUserByEmailService: FindUserByEmailService,
        private readonly findCompanyByOwnerIdAdapter: FindCompanyByOwnerIdAdapter,
        private readonly companyInvitationRequestWriteRepository: CompanyInvitationRequestWriteRepository,
        private readonly jwtService: JwtService,
        private readonly nodemailerAdapter: NodemailerAdapter,
        private readonly handlebarsAdapter: HandlebarsAdapter,
        private readonly configService: ConfigService,
    ) { };

    public async execute(
        params: {
            inviterId: string,
            email: string,
            role: CompanyMemberRoleEnum,
        }
    ) {

        const {
            inviterId,
            email,
            role,
        } = params;

        try {

            const inviter = await this.userReadRepository.findOneById(inviterId);

            const userCompany = await this.findCompanyByOwnerIdAdapter.find(inviterId);

            if (!userCompany) {

                throw new NotFoundException('company not found');

            };

            const invitee = await this.findUserByEmailService.find(email);

            const companyInvitation = await this.companyInvitationRequestWriteRepository.save(
                {
                    inviterId,
                    invitee: {
                        id: invitee?.id,
                        email,
                    },
                    role,
                    companyId: userCompany.id,
                    status: CompanyInvitationRequestStatusEnum.PENDING,
                }
            );

            const payload = {
                companyInvitationId: companyInvitation.id,
                userId: invitee?.id,
                email,
            }

            const token = await this.jwtService.signAsync(
                payload,
                {
                    secret: this.configService.get<string>('SECRET'),
                    expiresIn: "1d",
                }
            );

            const date = new Date();

            const time = [
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            ].map(num => String(num).padStart(2, '0')).join(':');

            const template = this.handlebarsAdapter.compile(
                {
                    templatesDir: './src/modules/user/src/presentation/templates',
                    templateName: 'company.invitation.template',
                    data: {
                        inviteeName: `${invitee?.firstName} ${invitee?.lastName}`,
                        inviteeEmail: email,
                        userExists: !!invitee,
                        inviterName: `${inviter.firstName} ${inviter.lastName}`,
                        companyName: userCompany.name,
                        role: role,
                        platformName: 'juuz',
                        platformDomain: 'juuz.com',
                        platformLink: 'https://dev.juuz.io',
                        inviteToken: token,
                        invitationTime: time,
                        expiryDate: '24h',
                        currentYear: new Date().getFullYear()
                    }
                }
            );

            await this.nodemailerAdapter.send(
                {
                    to: [email],
                    subject: '¡Invitation!',
                    text: '',
                    template,
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${InviteUserToCompanyUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};