import { Injectable, Logger } from "@nestjs/common";
import CompanyReadRepository from "../../infrastructure/repositories/company.read.repository";

@Injectable()
export default class FindOneCompanyByIdUseCase {

    private readonly logger = new Logger(FindOneCompanyByIdUseCase.name);

    public constructor(
        private readonly companyReadRepository: CompanyReadRepository,
    ) { };

    public async execute(
        companyId: string,
    ) {

        try {

            const findOneByIdRes = await this.companyReadRepository.findOneById(companyId);

            return findOneByIdRes;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindOneCompanyByIdUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};