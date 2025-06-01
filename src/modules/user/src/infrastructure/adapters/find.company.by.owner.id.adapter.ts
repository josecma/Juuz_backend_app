import { Inject, Injectable } from "@nestjs/common";
import FindCompanyByOwnerIdUseCase from "src/modules/company/src/application/useCases/find.company.by.owner.use.case";
import FindCompanyByOwnerIdPort from "../../application/ports/find.company.by.owner.id.port";

@Injectable()
export default class FindCompanyByOwnerIdAdapter implements FindCompanyByOwnerIdPort {

    public constructor(
        @Inject(FindCompanyByOwnerIdUseCase)
        private readonly findCompanyByOwnerIdUseCase: FindCompanyByOwnerIdUseCase,
    ) { };

    public async find(
        ownerId: string
    ) {

        try {

            const company = await this.findCompanyByOwnerIdUseCase.execute(
                ownerId,
            );

            return company;

        } catch (error) {

            throw error;

        };

    };

};