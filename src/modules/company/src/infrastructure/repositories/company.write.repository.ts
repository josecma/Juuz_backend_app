import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export default class CompanyWriteRepository {

    private readonly logger = new Logger(CompanyWriteRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly prisma: PrismaClient,
    ) { };

    public async save(
        params: {
            ownerId: string,
            companyMemberRoleId: string,
            company: {}
        }
    ) {

        const {
            ownerId,
            companyMemberRoleId,
            company,
        } = params;

        try {

            const res = await this.prisma.$transaction(
                async (tx) => {
                    const savedCompany = await tx.company.create(
                        {
                            data: company,
                        }
                    );

                    await tx.companyMember.create(
                        {
                            data: {
                                companyId: savedCompany.id,
                                memberId: ownerId,
                                roleId: companyMemberRoleId,
                            },
                        }
                    );

                    return savedCompany;
                }
            );

            return res;

        } catch (error) {

            this.logger.error(error);

            throw error;

        };

    };

    // public async update(
    //     params: {
    //         companyId: string;
    //         updateObj: {
    //             score: {
    //                 lastAvg: number;
    //                 lastDiv: number;
    //             };
    //         };
    //     }
    // ) {

    //     const { companyId, updateObj } = params;

    //     const { score } = updateObj;

    //     try {

    //         const res = await this.prisma.company.update({
    //             where: {
    //                 id: companyId,
    //             },
    //             data: {
    //                 score
    //             },
    //         });

    //         return res;

    //     } catch (error) {

    //         this.logger.error(error);
    //         throw error;

    //     };

    // };

};