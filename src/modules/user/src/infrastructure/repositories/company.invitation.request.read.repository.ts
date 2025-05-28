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

};