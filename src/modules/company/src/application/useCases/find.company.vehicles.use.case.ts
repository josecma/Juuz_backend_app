import { Injectable, Logger } from "@nestjs/common";
import S3Adapter from "src/modules/shared/src/infrastructure/adapters/s3.adapter";
import CompanyReadRepository from "../../infrastructure/repositories/company.read.repository";

@Injectable()
export default class FindCompanyVehiclesUseCase {

    private readonly logger = new Logger(FindCompanyVehiclesUseCase.name);

    public constructor(
        private readonly companyReadRepository: CompanyReadRepository,
        private readonly s3Adapter: S3Adapter,
    ) { };

    public async execute(
        companyId: string,
    ) {

        try {

            const findCompanyVehiclesResponse = await this.companyReadRepository.findCompanyVehicles(companyId);

            const vehicles = await Promise.all(

                findCompanyVehiclesResponse.map(

                    async (e) => {

                        const {
                            pictures,
                            ...vehicleRes
                        } = e;

                        const vehiclePictures = await Promise.all(

                            pictures.map(

                                async (e) => {

                                    return {
                                        id: e.id,
                                        url: (await this.s3Adapter.getFileUrl({ key: e.key })).signedUrl,
                                    }

                                }

                            )

                        )

                        return {
                            ...vehicleRes,
                            pictures: vehiclePictures,
                        };
                    }
                )
            );

            return vehicles;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindCompanyVehiclesUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};