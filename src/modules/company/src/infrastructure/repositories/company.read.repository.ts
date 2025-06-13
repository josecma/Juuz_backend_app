import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CompanyMemberRoleEnum } from "../../domain/enums/company.member.role.enum";
import CompanyDriverMapper from "../mappers/company.driver.mapper";
import CompanyVehicleMapper from "../mappers/company.vehicle.mapper";

@Injectable()
export default class CompanyReadRepository {

    private readonly logger = new Logger(CompanyReadRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findOneById(
        companyId: string
    ) {

        try {

            const res = await this.client.company.findUnique({
                where: {
                    id: companyId,
                },
                include: {
                    companyAddress: {
                        include: {
                            address: true,
                        }
                    }
                }
            });

            const { companyAddress, ...company } = res;

            return Object.assign(
                {},
                company,
                {
                    address: companyAddress.address,
                }
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyReadRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findCompanyVehicles(
        companyId: string,
    ) {

        try {

            const res = await this.client.company.findUnique(
                {
                    where: {
                        id: companyId,
                    },
                    include: {
                        companyMembers: {
                            include: {
                                member: {
                                    include: {
                                        vehicles: {
                                            include: {
                                                pictures: {
                                                    include: {
                                                        file: true,
                                                    },
                                                },
                                                vehicleInfo: {
                                                    include: {
                                                        model: {
                                                            include: {
                                                                make: true,
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            );

            return res ? CompanyVehicleMapper.to(res) : null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyReadRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async findCompanyDrivers(
        companyId: string
    ) {

        try {

            const findCompanyDriversResponse = await this.client.company.findUnique(
                {
                    where: {
                        id: companyId,
                    },
                    select: {
                        companyMembers: {
                            where: {
                                role: {
                                    name: CompanyMemberRoleEnum.DRIVER,
                                }
                            },
                            include: {
                                member: {
                                    include: {
                                        identities: true,
                                    }
                                },
                                driver: true,
                            },
                        }
                    }
                }
            );

            return findCompanyDriversResponse.companyMembers.map(
                (e) => CompanyDriverMapper.to(e)
            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyReadRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};