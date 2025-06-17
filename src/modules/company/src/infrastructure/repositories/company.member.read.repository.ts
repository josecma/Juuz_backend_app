import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class CompanyMemberReadRepository {

    private readonly logger = new Logger(CompanyMemberReadRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneBy(
        params: {
            memberId: string;
            roleId: string;
        }
    ) {

        const {
            memberId,
            roleId,
        } = params;

        try {

            const companyMember = await this.client.companyMember.findFirst(
                {
                    where: {
                        memberId,
                        roleId,
                    },
                }
            );

            return companyMember;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyMemberReadRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findMember(
        params: {
            memberId: string,
            roleId: string,
            companyId: string,
        }
    ) {

        const {
            memberId,
            roleId,
            companyId,
        } = params;

        try {

            const findCompanyMemberResponse = await this.client.companyMember.findUnique(
                {
                    where: {
                        memberId_companyId_roleId: {
                            memberId,
                            roleId,
                            companyId,
                        }
                    },
                }
            );

            return findCompanyMemberResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyMemberReadRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    // public async findMember(
    //     params: {
    //         memberId: string,
    //         roleId: string,
    //         companyId: string,
    //     }
    // ) {

    //     const {
    //         memberId,
    //         roleId,
    //         companyId,
    //     } = params;

    //     try {

    //         const findCompanyMemberResponse = await this.client.companyMember.findUnique(
    //             {
    //                 where: {
    //                     memberId_companyId_roleId: {
    //                         memberId,
    //                         roleId,
    //                         companyId,
    //                     }
    //                 },
    //             }
    //         );

    //         return findCompanyMemberResponse;

    //     } catch (error) {

    //         this.logger.error(
    //             {
    //                 source: `${CompanyMemberReadRepository.name}`,
    //                 message: error.message,
    //             }
    //         );

    //         throw error;

    //     };

    // };

};