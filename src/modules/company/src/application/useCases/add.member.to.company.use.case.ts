import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import CompanyMemberWriteRepository from "../../infrastructure/repositories/company.member.write.repository";
import CompanyReadRepository from "../../infrastructure/repositories/company.read.repository";
import CompanyRoleReadRepository from "../../infrastructure/repositories/company.member.role.read.repository";

@Injectable({})
export default class AddMemberToCompanyUseCase {

    private readonly logger = new Logger(AddMemberToCompanyUseCase.name);

    public constructor(
        private readonly companyMemberWriteRepository: CompanyMemberWriteRepository,
        private readonly companyReadRepository: CompanyReadRepository,
        private readonly companyRoleReadRepository: CompanyRoleReadRepository,
    ) { };

    public async execute(
        params: {
            companyId: string;
            memberId: string;
            roleName: string;
        }
    ) {

        const {
            companyId,
            memberId,
            roleName,
        } = params;

        try {

            const findCompany = await this.companyReadRepository.findOneById(companyId);

            if (!findCompany) {
                throw new NotFoundException(
                    {
                        message: 'company not found',
                    }
                );
            };

            const findMemberCompanyRole = await this.companyRoleReadRepository.findOneByName(roleName.toUpperCase());

            if (!findMemberCompanyRole) {
                throw new NotFoundException(
                    {
                        message: 'member company role not found',
                    }
                );
            };

            const savedCompanyMember = await this.companyMemberWriteRepository.save(
                {
                    companyId,
                    memberId,
                    roleId: findMemberCompanyRole.id,
                }
            );

            return savedCompanyMember;

        } catch (error) {

            this.logger.error(
                {
                    source: `${AddMemberToCompanyUseCase.name}`,
                    message: `${error.message}`
                }
            );

            throw error;

        };

    };

};