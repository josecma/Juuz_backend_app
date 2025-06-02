import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import ConflictDomainException from "src/modules/shared/src/domain/exceptions/conflict.domain.exception";
import FindCompanyMemberService from "../../domain/services/find.company.member.service";
import CompanyMemberRoleReadRepository from "../../infrastructure/repositories/company.member.role.read.repository";
import CompanyMemberWriteRepository from "../../infrastructure/repositories/company.member.write.repository";
import CompanyReadRepository from "../../infrastructure/repositories/company.read.repository";

@Injectable({})
export default class AddMemberToCompanyUseCase {

    private readonly logger = new Logger(AddMemberToCompanyUseCase.name);

    public constructor(
        private readonly companyMemberWriteRepository: CompanyMemberWriteRepository,
        private readonly companyMemberRoleReadRepository: CompanyMemberRoleReadRepository,
        private readonly companyReadRepository: CompanyReadRepository,
        private readonly findCompanyMemberService: FindCompanyMemberService,
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

            const findCompanyResponse = await this.companyReadRepository.findOneById(companyId);

            if (findCompanyResponse == null) {

                throw new NotFoundException(
                    {
                        message: 'company not found',
                    }
                );

            };

            const findCompanyMemberRoleResponse = await this.companyMemberRoleReadRepository.findOneByName(roleName);

            if (findCompanyMemberRoleResponse == null) {

                throw new NotFoundException(
                    {
                        message: 'company member role not found',
                    }
                );

            };

            const findCompanyMemberResponse = await this.findCompanyMemberService.find(
                {
                    companyId,
                    memberId,
                    companyMemberRoleId: findCompanyMemberRoleResponse.id,
                }
            );

            if (findCompanyMemberResponse != null) {

                throw new ConflictDomainException(
                    {
                        message: 'company member already exists',
                    }
                );

            };

            const saveCompanyMemberResponse = await this.companyMemberWriteRepository.save(
                {
                    companyId,
                    memberId,
                    roleId: findCompanyMemberRoleResponse.id,
                }
            );

            return saveCompanyMemberResponse;

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