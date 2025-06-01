import { Inject, Injectable, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import CompanyReadRepository from "./company.read.repository";

@Injectable()
export default class CompanyWriteRepository {

    private readonly logger = new Logger(CompanyWriteRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly prisma: PrismaClient,
        private readonly companyReadRepository: CompanyReadRepository,
    ) { };

    public async save(
        params: {
            ownerId: string,
            companyMemberRoleId: string,
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
            ownerId,
            companyMemberRoleId,
            company,
        } = params;

        const {
            address,
            ...companyRes
        } = company;

        const {
            location,
            metadata,
            ...addressRes
        } = address;

        const geoPoint = {
            type: "Point",
            coordinates: [
                location.longitude,
                location.latitude
            ],
        }

        try {

            const res = await this.prisma.$transaction(

                async (tx) => {

                    const saveAddressResponse = await tx.address.create(
                        {
                            data: {
                                ...addressRes,
                                location: geoPoint,
                                metadata: metadata as Prisma.JsonValue,
                            }
                        }
                    );

                    const saveCompanyResponse = await tx.company.create(
                        {
                            data: companyRes
                        }
                    );

                    await tx.companyAddress.create(
                        {
                            data: {
                                companyId: saveCompanyResponse.id,
                                addressId: saveAddressResponse.id,
                            }
                        }
                    );

                    await tx.companyMember.create(
                        {
                            data: {
                                companyId: saveCompanyResponse.id,
                                memberId: ownerId,
                                roleId: companyMemberRoleId,
                            },
                        }
                    );

                    const fineUniqueCompanyResponse = await tx.company.findUnique(
                        {
                            where: {
                                id: saveCompanyResponse.id,
                            },
                            include: {
                                companyAddress: {
                                    include: {
                                        address: true,
                                    }
                                },
                            }
                        }
                    );

                    return fineUniqueCompanyResponse;

                }

            );

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
                    source: `${CompanyWriteRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

    public async update(
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

        const {
            address,
            ...updateObjectRest
        } = updateObject;

        try {

            await this.prisma.$transaction(

                async (tx) => {

                    const findUniqueCompanyAddressResponse = await tx.companyAddress.findUnique(
                        {
                            where: {
                                companyId: id,
                            }
                        }
                    );

                    const {
                        companyId,
                        addressId
                    } = findUniqueCompanyAddressResponse;

                    if (updateObject.address) {

                        const {
                            location,
                            metadata,
                            ...addressRest
                        } = address;

                        let geoPoint: {
                            type: string,
                            coordinates: [number, number],
                        };

                        if (location) {

                            geoPoint = {
                                type: "Point",
                                coordinates: [
                                    location.longitude,
                                    location.latitude
                                ],
                            };

                        };

                        await tx.address.update(
                            {
                                where: {
                                    id: addressId,
                                },
                                data: {
                                    ...addressRest,
                                    location: geoPoint,
                                    metadata: metadata as Prisma.JsonValue,
                                }
                            }
                        );

                    }

                    await tx.company.update(
                        {
                            where: {
                                id,
                            },
                            data: updateObjectRest,
                        }
                    );

                }

            );

            return this.companyReadRepository.findOneById(id);

        } catch (error) {

            this.logger.error(
                {
                    source: `${CompanyWriteRepository.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};