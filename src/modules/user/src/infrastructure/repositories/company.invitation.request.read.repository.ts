import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class CompanyInvitationRequestReadRepository {

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

            const res = await this.client.companyInvitationRequest.findFirst(
                {
                    where: {
                        inviterId,
                        status: 'PENDING',
                        invitee: {
                            path: ['email'],
                            equals: email,
                        }
                    },
                }
            );

            return res as unknown as {
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

            throw error;

        };

    };

};