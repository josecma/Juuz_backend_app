import { Inject, Injectable } from "@nestjs/common";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import CompanyReadRepository from "../../infrastructure/repositories/company.read.repository";

@Injectable()
export default class FindCompanyByOwnerIdService {

    public constructor(
        @Inject(CompanyReadRepository)
        private readonly companyReadRepository: CompanyReadRepository,
    ) { };

    public async find(
        ownerId: string,
    ) {

        try {

            const company = await this.companyReadRepository.findOneByOwnerId(
                ownerId
            );

            if (!company) {
                throw new NotFoundDomainException(
                    {
                        message: `the owner's company with id:${ownerId} not found`,
                        source: `${FindCompanyByOwnerIdService.name}`,
                    }
                );
            };

            return company;

        } catch (error) {

            throw error;

        };
    };

};