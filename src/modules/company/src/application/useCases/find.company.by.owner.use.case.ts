import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import CompanyMemberReadRepository from "../../infrastructure/repositories/company.member.read.repository";
import CompanyReadRepository from "../../infrastructure/repositories/company.read.repository";
import CompanyRoleReadRepository from "../../infrastructure/repositories/company.role.read.repository";

@Injectable()
export default class FindCompanyByOwnerIdUseCase {

    private readonly logger = new Logger(FindCompanyByOwnerIdUseCase.name);

    public constructor(
        @Inject(CompanyReadRepository)
        private companyReadRepository: CompanyReadRepository,
        @Inject(CompanyMemberReadRepository)
        private companyMemberReadRepository: CompanyMemberReadRepository,
        @Inject(CompanyRoleReadRepository)
        private companyRoleReadRepository: CompanyRoleReadRepository,
    ) { };

    public async execute(
        ownerId: string
    ) {

        try {

            const role = await this.companyRoleReadRepository.findOneByName('OWNER');

            if (!role) {
                throw new NotFoundException(
                    {
                        message: 'role not found',
                    }
                );
            };

            const companyOwner = await this.companyMemberReadRepository.findOneBy(
                {
                    memberId: ownerId,
                    roleId: role.id
                }
            );

            if (!companyOwner) {
                throw new NotFoundException(
                    {
                        message: 'company owner not found',
                    }
                );
            };

            const company = await this.companyReadRepository.findOneById(companyOwner.companyId);

            return company;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindCompanyByOwnerIdUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};