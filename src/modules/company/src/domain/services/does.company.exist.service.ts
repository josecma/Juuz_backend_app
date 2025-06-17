import { Injectable, Logger } from "@nestjs/common";
import CompanyReadRepository from "../../infrastructure/repositories/company.read.repository";

@Injectable()
export default class DoesCompanyExistService {

    private readonly logger = new Logger(DoesCompanyExistService.name);

    public constructor(
        private readonly companyReadRepository: CompanyReadRepository,
    ) { };

    public async doesItExist(
        companyId: string,
    ) {

        try {

            const findOneByIdResponse = await this.companyReadRepository.findOneById(
                companyId
            );

            return findOneByIdResponse != null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${DoesCompanyExistService.name}`,
                    message: `err veryfing if company exist: ${error.message}`,
                }
            );

        };
    };

};