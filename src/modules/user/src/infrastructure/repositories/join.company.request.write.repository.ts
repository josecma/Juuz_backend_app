import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserRoleEnum } from "../../domain/enums/user.role.enum";

@Injectable({})
export default class JoinCompanyRequestWriteRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            requestId: string;
            companyId: string;
            as: UserRoleEnum;
        },
    ) {

        const {
            requestId,
            companyId,
            as,
        } = params;

        try {

            const res = await this.client.joinCompanyRequest.create(
                {
                    data: {
                        requestId,
                        companyId: companyId.toString(),
                        as,
                    },
                },
            );

            return res;

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

            const res = await this.client.joinCompanyRequest.update(
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