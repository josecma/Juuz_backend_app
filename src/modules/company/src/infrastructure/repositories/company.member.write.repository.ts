import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class CompanyMemberWriteRepository {

    private readonly logger = new Logger(CompanyMemberWriteRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly prisma: PrismaClient,
    ) { };

    public async save(
        params: {
            companyId: string;
            memberId: string;
            roleId: string;
        }
    ) {

        const {
            companyId,
            memberId,
            roleId,
        } = params;

        try {

            const res = await this.prisma.companyMember.create({
                data: {
                    companyId,
                    memberId,
                    roleId,
                },
            });

            return res;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyMemberWriteRepository.name}`,
                    message: `${error.message}`
                }
            );

            throw error;

        };

    };

};