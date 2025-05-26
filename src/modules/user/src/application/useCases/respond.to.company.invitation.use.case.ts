import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import AddMemberToCompanyUseCase from "src/modules/company/src/application/useCases/add.member.to.company.use.case";
import { CompanyInvitationRequestStatusEnum } from "../../domain/enums/company.invitation.request.status.enum";
import CompanyInvitationRequestReadRepository from "../../infrastructure/repositories/company.invitation.request.read.repository";
import CompanyInvitationRequestWriteRepository from "../../infrastructure/repositories/company.invitation.request.write.repository";

@Injectable({})
export default class RespondToCompanyInvitationUseCase {

    private readonly logger = new Logger(RespondToCompanyInvitationUseCase.name);

    public constructor(
        private readonly companyInvitationRequestReadRepository: CompanyInvitationRequestReadRepository,
        private readonly companyInvitationRequestWriteRepository: CompanyInvitationRequestWriteRepository,
        private readonly addMemberToCompanyUseCase: AddMemberToCompanyUseCase,
    ) { };

    public async execute(
        params: {
            inviteeId: string,
            companyInvitationId: string,
            status: CompanyInvitationRequestStatusEnum,
        }
    ) {

        const {
            inviteeId,
            companyInvitationId,
            status,
        } = params;

        try {

            const companyInvitationRequest = await this.companyInvitationRequestReadRepository.findOneById(companyInvitationId);

            if (
                !companyInvitationRequest
                ||
                companyInvitationRequest.inviteeId !== inviteeId
            ) {

                throw new NotFoundException('company invitation request not found');

            };

            if (status === CompanyInvitationRequestStatusEnum.ACCEPTED) {

                await this.addMemberToCompanyUseCase.execute(
                    {
                        memberId: companyInvitationRequest.inviteeId,
                        roleName: companyInvitationRequest.role,
                        companyId: companyInvitationRequest.companyId,
                    }
                );

            };

            await this.companyInvitationRequestWriteRepository.update(
                {
                    id: companyInvitationRequest.id,
                    updateObject: {
                        status,
                    },
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${RespondToCompanyInvitationUseCase.name}`,
                    message: `${error.message}`,
                }
            );

            throw error;

        };

    };

};