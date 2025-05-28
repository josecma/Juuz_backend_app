import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AddMemberToCompanyUseCase from "src/modules/company/src/application/useCases/add.member.to.company.use.case";
import User from "../../domain/entities/user";
import { CompanyInvitationRequestStatusEnum } from "../../domain/enums/company.invitation.request.status.enum";
import { IdentityEnum } from "../../domain/enums/identity.enum";
import CompanyInvitationRequestReadRepository from "../../infrastructure/repositories/company.invitation.request.read.repository";
import CompanyInvitationRequestWriteRepository from "../../infrastructure/repositories/company.invitation.request.write.repository";
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
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly createUserUseCase: CreateUserUseCase,
    ) { };

    public async execute(
        token: string
    ) {

        let user: {
            user: User,
            emails: {
                value: string,
                metadata: Record<string, unknown>,
            }[],
        } = null;

        try {

            const payload: {
                companyInvitationRequestId: string,
                userId?: string,
                email: string,
            } = await this.jwtService.verifyAsync(token);

            const {
                companyInvitationRequestId,
                userId,
                email,
            } = payload;

            const companyInvitationRequest = await this.companyInvitationRequestReadRepository.findOneById(payload.companyInvitationRequestId);

            if (
                !companyInvitationRequest
                ||
                companyInvitationRequest.id !== companyInvitationRequestId
            ) {

                throw new NotFoundException('company invitation request not found');

            };

            user = userId
                ? await this.findUserByIdUseCase.execute(
                    {
                        userId,
                        include: {
                            emails: true
                        }
                    }
                ) :
                await this.createUserUseCase.execute(
                    {
                        identities: [
                            {
                                type: IdentityEnum.EMAIL,
                                value: email,
                            }
                        ]
                    }
                );

            await this.addMemberToCompanyUseCase.execute(
                {
                    memberId: user.user.id,
                    roleName: companyInvitationRequest.role,
                    companyId: companyInvitationRequest.companyId,
                }
            );

            await this.companyInvitationRequestWriteRepository.update(
                {
                    id: companyInvitationRequest.id,
                    updateObject: {
                        status: CompanyInvitationRequestStatusEnum.ACCEPTED,
                    },
                }
            );

            return Object.assign(
                {},
                {
                    id: user.user.id,
                    firstName: user.user.firstName,
                    lastName: user.user.lastName,
                },
                {
                    emails: user.emails,
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