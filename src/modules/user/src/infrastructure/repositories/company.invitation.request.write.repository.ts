import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CompanyMemberRoleEnum } from "src/modules/company/src/domain/enums/company.member.role.enum";
import { CompanyInvitationRequestStatusEnum } from "../../domain/enums/company.invitation.request.status.enum";

@Injectable({})
export default class CompanyInvitationRequestWriteRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            inviterId: string,
            invitee: {
                id?: string,
                email?: string,
            },
            companyId: string,
            role: CompanyMemberRoleEnum,
            status: CompanyInvitationRequestStatusEnum,
        },
    ) {

        const {
            inviterId,
            invitee,
            companyId,
            role,
            status,
        } = params;

        try {

            const res = await this.client.companyInvitationRequest.create(
                {
                    data: {
                        inviterId,
                        invitee,
                        companyId,
                        role,
                        status,
                    },
                },
            );

            return res as Omit<typeof res, "invitee"> & { invitee: { id?: string, email?: string } };

        } catch (error) {

            throw error;

        };

    };

    public async update(
        params: {
            id: string;
            updateObject: {
                status?: string;
            };
        },
    ) {

        const {
            id,
            updateObject,
        } = params;

        try {

            const res = await this.client.companyInvitationRequest.update(
                {
                    where: {
                        id,
                    },
                    data: updateObject,
                },
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

};