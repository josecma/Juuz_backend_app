import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CompanyMemberRoleEnum } from "src/modules/company/src/domain/enums/company.member.role.enum";
import { CompanyInvitationRequestStatusEnum } from "../../domain/enums/company.invitation.request.status.enum";
import FindCompanyByOwnerIdAdapter from "../../infrastructure/adapters/find.company.by.owner.id.adapter";
import CompanyInvitationRequestWriteRepository from "../../infrastructure/repositories/company.invitation.request.write.repository";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

@Injectable()
export default class InviteUserToCompanyUseCase {

    private readonly logger = new Logger(InviteUserToCompanyUseCase.name);

    public constructor(
        private readonly userReadRepository: UserReadRepository,
        private readonly findCompanyByOwnerIdAdapter: FindCompanyByOwnerIdAdapter,
        private readonly companyInvitationRequestWriteRepository: CompanyInvitationRequestWriteRepository,
    ) { };

    public async execute(
        params: {
            inviterId: string,
            inviteeId: string,
            role: CompanyMemberRoleEnum,
        }
    ) {

        const {
            inviterId,
            inviteeId,
            role,
        } = params;

        try {

            const inviter = await this.userReadRepository.findOneById(inviterId);

            if (!inviter) {

                throw new NotFoundException('inviter user not found');

            };

            const userCompany = await this.findCompanyByOwnerIdAdapter.find(inviterId);

            if (!userCompany) {

                throw new NotFoundException('company not found');

            };

            const invitee = await this.userReadRepository.findOneById(inviteeId);

            if (!invitee) {

                throw new NotFoundException('invitee user not found');

            };

            await this.companyInvitationRequestWriteRepository.save(
                {
                    inviterId,
                    inviteeId,
                    role,
                    companyId: userCompany.id,
                    status: CompanyInvitationRequestStatusEnum.PENDING,
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${InviteUserToCompanyUseCase.name}`,
                    message: `${error.message}`,
                }
            );

            throw error;

        };

    };

};