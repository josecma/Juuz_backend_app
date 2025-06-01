import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import CompanyReadRepository from "../../infrastructure/repositories/company.read.repository";
import CompanyWriteRepository from "../../infrastructure/repositories/company.write.repository";

@Injectable()
export default class UpdateCompanyUseCase {

    private readonly logger = new Logger(UpdateCompanyUseCase.name);

    public constructor(
        private readonly companyWriteRepository: CompanyWriteRepository,
        private readonly companyReadRepository: CompanyReadRepository,
    ) { };

    public async execute(
        params: {
            id: string,
            updateObject?: {
                name?: string,
                carrierIdentifier?: string,
                email?: string,
                usdot?: string,
                mc?: string,
                phoneNumber?: string,
                address?: {
                    country?: string,
                    city?: string,
                    state?: string,
                    zipCode?: string,
                    street?: string,
                    location?: {
                        latitude: number,
                        longitude: number,
                    },
                    metadata?: Record<string, unknown>
                },
            },
        }
    ) {

        const {
            id,
            updateObject,
        } = params;

        try {

            const findOneByIdResponse = await this.companyReadRepository.findOneById(id);

            if (!findOneByIdResponse) throw new NotFoundException("company not found");

            const updateCompanyResponse = await this.companyWriteRepository.update(
                {
                    id,
                    updateObject,
                }
            );

            return updateCompanyResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${UpdateCompanyUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};