import { Injectable, Logger } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import S3Adapter from "src/modules/shared/src/infrastructure/adapters/s3.adapter";
import CompanyReadRepository from "../../infrastructure/repositories/company.read.repository";

@Injectable()
export default class FindCompanyDriversUseCase {

    private readonly logger = new Logger(FindCompanyDriversUseCase.name);

    public constructor(
        private readonly companyReadRepository: CompanyReadRepository,
        private readonly s3Adapter: S3Adapter,
    ) { };

    public async execute(
        companyId: string,
    ) {

        try {

            const findCompanyByIdResponse = this.companyReadRepository.findOneById(companyId);

            if (findCompanyByIdResponse == null) {

                throw new NotFoundDomainException(
                    {
                        message: "company not found",
                    }
                )

            };

            const findCompanyDriversResponse = await this.companyReadRepository.findCompanyDrivers(companyId);

            return findCompanyDriversResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindCompanyDriversUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};