import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import companyMemberRoleData from "./company.member.role.data";

@Injectable()
export default class CompanyMemberRoleSeed {

    private readonly looger = new Logger(CompanyMemberRoleSeed.name);

    public constructor(
        private readonly client: PrismaClient,
    ) { };

    public async up() {

        try {

            const findManyCompanyMemberRolesReponse = await this.client.companyMemberRole.findMany();

            await this.client.companyMemberRole.createMany(
                {
                    data: companyMemberRoleData.filter(
                        roleData => !findManyCompanyMemberRolesReponse.find(
                            role => role.name === roleData.name
                        )
                    ),
                }
            );

            this.looger.log("company member roles seeded successfully");

        } catch (error) {

            this.looger.error(
                {
                    source: `${CompanyMemberRoleSeed.name}`,
                    message: error.message,
                }
            );

        };

    };

};