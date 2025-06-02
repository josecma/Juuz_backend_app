import { Injectable, Logger } from "@nestjs/common";
import CompanyMemberReadRepository from "../../infrastructure/repositories/company.member.read.repository";

@Injectable()
export default class FindCompanyMemberService {

    private readonly logger = new Logger(FindCompanyMemberService.name);

    public constructor(
        private readonly companyMemberReadRepository: CompanyMemberReadRepository,
    ) { };

    public async find(
        params: {
            memberId: string,
            companyId: string,
            companyMemberRoleId: string,
        }
    ) {

        const {
            memberId,
            companyId,
            companyMemberRoleId,
        } = params;

        try {

            const findCompanyMemberResponse = await this.companyMemberReadRepository.findMember(
                {
                    memberId,
                    roleId: companyMemberRoleId,
                    companyId,
                }
            );

            return findCompanyMemberResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindCompanyMemberService.name}`,
                    message: error.message,
                }
            );

            throw error;

        };
    };

};