import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CompanyInvitationRequestStatusEnum } from "../../domain/enums/company.invitation.request.status.enum";

@Injectable({})
export default class CompanyInvitationRequestReadRepository {

    private readonly logger = new Logger(CompanyInvitationRequestReadRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneById(
        id: string
    ) {

        try {

            const res = await this.client.companyInvitationRequest.findUnique(
                {
                    where: {
                        id,
                    }
                }
            );

            return res as Omit<typeof res, "invitee"> & { invitee: { id?: string, email?: string } };

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyInvitationRequestReadRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findPendingCompanyInvitationByEmail(
        params: {
            inviterId: string,
            email: string,
        }
    ) {

        const {
            inviterId,
            email,
        } = params;

        try {

            const findFirstResponse = await this.client.companyInvitationRequest.findFirst(
                {
                    where: {
                        inviterId,
                        status: CompanyInvitationRequestStatusEnum.PENDING,
                        invitee: {
                            path: ['email'],
                            equals: email,
                        }
                    },
                }
            );

            return findFirstResponse as unknown as {
                id: string,
                status: string,
                companyId: string,
                role: string,
                invitee: {
                    id?: string,
                    email: string,
                }
            };

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyInvitationRequestReadRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};