import { Injectable, Logger } from "@nestjs/common";
import { CompanyMemberRoleEnum } from "../../domain/enums/company.member.role.enum";
import CompanyMemberRoleReadRepository from "../../infrastructure/repositories/company.member.role.read.repository";
import CompanyWriteRepository from "../../infrastructure/repositories/company.write.repository";

@Injectable()
export default class CreateCompanyUseCase {

    private readonly logger = new Logger(CreateCompanyUseCase.name);

    public constructor(
        private readonly companyWriteRepository: CompanyWriteRepository,
        private readonly companyMemberRoleReadRepository: CompanyMemberRoleReadRepository,
    ) { };

    public async execute(
        params: {
            userId: string,
            company: {
                name: string,
                carrierIdentifier: string,
                email: string,
                usdot: string,
                mc: string,
                phoneNumber: string,
                address: {
                    country: string,
                    city: string,
                    state: string,
                    zipCode: string,
                    street: string,
                    location: {
                        latitude: number,
                        longitude: number,
                    },
                    metadata?: Record<string, unknown>
                },
            },
        }
    ) {

        const {
            userId,
            company,
        } = params;

        try {

            const companyMemberRole = await this.companyMemberRoleReadRepository.findOneByName(CompanyMemberRoleEnum.OWNER);

            const companyRes = await this.companyWriteRepository.save(
                {
                    ownerId: userId,
                    companyMemberRoleId: companyMemberRole.id,
                    company,
                }
            );

            return companyRes;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CreateCompanyUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};