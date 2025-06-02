import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AddMemberToCompanyUseCase from "src/modules/company/src/application/useCases/add.member.to.company.use.case";
import User from "../../domain/entities/user";
import { CompanyInvitationRequestStatusEnum } from "../../domain/enums/company.invitation.request.status.enum";
import { IdentityEnum } from "../../domain/enums/identity.enum";
import CompanyInvitationRequestReadRepository from "../../infrastructure/repositories/company.invitation.request.read.repository";
import CompanyInvitationRequestWriteRepository from "../../infrastructure/repositories/company.invitation.request.write.repository";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";
import CreateUserUseCase from "./create.user.use.case";
import FindUserByIdUseCase from "./find.user.by.id.use.case";

@Injectable()
export default class AcceptCompanyInvitationUseCase {

    private readonly logger = new Logger(AcceptCompanyInvitationUseCase.name);

    public constructor(
        private readonly companyInvitationRequestReadRepository: CompanyInvitationRequestReadRepository,
        private readonly companyInvitationRequestWriteRepository: CompanyInvitationRequestWriteRepository,
        private readonly addMemberToCompanyUseCase: AddMemberToCompanyUseCase,
        private readonly jwtService: JwtService,
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly userReadRepository: UserReadRepository,
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

        let user: {
            user: User,
            emails: {
                value: string,
                metadata: Record<string, unknown>,
            }[],
        } = null;

        let payload: {
            companyInvitationId: string,
            userId?: string,
            email: string,
        } = null;

        try {

            try {

                payload = await this.jwtService.verifyAsync(token);

            } catch (error) {

                throw new Error("not valid or expired token");

            }

            const {
                companyInvitationId,
                email,
            } = payload;

            const companyInvitationRequest = await this.companyInvitationRequestReadRepository.findOneById(companyInvitationId);

            if (
                companyInvitationRequest == null
                ||
                companyInvitationRequest.id !== companyInvitationId
                ||
                companyInvitationRequest.invitee.email !== email
            ) {

                throw new NotFoundException('company invitation request not found');

            };

            const findUserByEmail = await this.userReadRepository.findOneByEmail(email);

            if (findUserByEmail == null) {

                user = await this.createUserUseCase.execute(
                    {
                        identities: [
                            {
                                type: IdentityEnum.EMAIL,
                                value: email,
                            }
                        ]
                    }
                );

            };

            if (status === CompanyInvitationRequestStatusEnum.ACCEPTED) {

                await this.addMemberToCompanyUseCase.execute(
                    {
                        memberId: findUserByEmail?.id ?? user.user.id,
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
                    source: `${AcceptCompanyInvitationUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};