import { Inject, Injectable } from "@nestjs/common";
import FindCompanyByOwnerIdPort from "../../application/ports/find.company.by.owner.id.port";
import CompanyReadRepository from "src/modules/company/src/infrastructure/repositories/company.read.repository";

@Injectable()
export default class FindCompanyByOwnerIdAdapter implements FindCompanyByOwnerIdPort {

    public constructor(
        @Inject(CompanyReadRepository)
        private readonly companyReadRepository: CompanyReadRepository,
    ) { };

    public async find(
        ownerId: String
    ): Promise<any> {

        try {

            const company = await this.companyReadRepository.findOneByOwnerId(
                ownerId,
            );

            return company;

        } catch (error) {

            throw error;

        };

    };

};