import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AddMemberToCompanyUseCase from "src/modules/company/src/application/useCases/add.member.to.company.use.case";
import { CompanyInvitationRequestStatusEnum } from "../../domain/enums/company.invitation.request.status.enum";
import CompanyInvitationRequestReadRepository from "../../infrastructure/repositories/company.invitation.request.read.repository";
import CompanyInvitationRequestWriteRepository from "../../infrastructure/repositories/company.invitation.request.write.repository";

@Injectable({})
export default class RespondToCompanyInvitationUseCase {

    private readonly logger = new Logger(RespondToCompanyInvitationUseCase.name);

    public constructor(
        private readonly jwtService: JwtService,
        private readonly companyInvitationRequestReadRepository: CompanyInvitationRequestReadRepository,
        private readonly companyInvitationRequestWriteRepository: CompanyInvitationRequestWriteRepository,
        private readonly addMemberToCompanyUseCase: AddMemberToCompanyUseCase,
    ) { };

    public async execute(
        params: {
            token: string,
            status: CompanyInvitationRequestStatusEnum,
        }
    ) {

        const {
            token,
            status,
        } = params;

        try {

            const payload = await this.jwtService.verifyAsync(token);

            const {
                companyInvitationRequestId,
            } = payload;

            const companyInvitationRequest = await this.companyInvitationRequestReadRepository.findOneById(companyInvitationRequestId);

            if (!companyInvitationRequest) {

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