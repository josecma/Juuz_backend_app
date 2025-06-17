import { Inject, Injectable, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { BusinessStakeholderStatusEnum } from "../../domain/enums/business.stakeholder.status.enum";
import { OfferStatusEnum } from "../../domain/enums/offer.status.enum";
import MonetaryOffer from "../../domain/valueObjects/monetary.offer";
import Offer from "../../domain/valueObjects/offer";
import BusinessMapper from "../mappers/business.mapper";

@Injectable({})
export default class NegotiationWriteRepository {

    private readonly logger = new Logger(NegotiationWriteRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async updateBusinessById(
        params: {
            id: string,
            updateObject: {
                status?: string,
            }
        }
    ) {

        const {
            id,
            updateObject,
        } = params;

        try {

            const updateBusinessResponse = await this.client.business.update(
                {
                    where: {
                        id,
                    },
                    data: {
                        status: updateObject.status,
                    },
                    include: {
                        objects: true,
                        stakeholders: true,
                        offers: true,
                    }
                }
            );

            return updateBusinessResponse != null ? BusinessMapper.to(updateBusinessResponse) : null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationWriteRepository.name}.updateBusinessById`,
                    message: `err updating business: ${error.message}`,
                }
            );

        };

    };

    public async saveBusiness(
        params: {
            status: string,
            objects: Array<
                {
                    id: string,
                    type: string,
                    details?: Record<string, unknown>
                }
            >,
            stakeholders: Array<
                {
                    id: string,
                    role: string,
                    type: string,
                    details?: Record<string, unknown>
                }
            >,
        }
    ) {

        const {
            stakeholders,
            status,
            objects,
        } = params;

        try {

            const business = await this.client.$transaction(

                async (tx) => {

                    const savedBusiness = await tx.business.create(
                        {
                            data: {
                                status,
                            }
                        }
                    );

                    await tx.businessObject.createMany(
                        {
                            data: objects.map(

                                o => {

                                    const { id, type, details } = o;

                                    return {
                                        objectId: id,
                                        type,
                                        businessId: savedBusiness.id,
                                        details: details as Prisma.JsonValue,
                                    };

                                }

                            ),

                        }

                    );

                    await tx.businessStakeholder.createMany(
                        {
                            data: stakeholders.map(

                                s => {

                                    const { role, id, type, details } = s;

                                    return {
                                        role,
                                        type,
                                        status: BusinessStakeholderStatusEnum.PENDING,
                                        businessId: savedBusiness.id,
                                        stakeholderId: id,
                                        details: details as Prisma.JsonValue,
                                    };

                                }

                            )
                        }
                    );

                    const findBusiness = await tx.business.findUnique(
                        {
                            where: {
                                id: savedBusiness.id,
                            },
                            include: {
                                stakeholders: true,
                                offers: true,
                                objects: true,
                            }
                        }
                    );

                    return findBusiness;

                }

            );

            return business != null ? BusinessMapper.to(business) : null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationWriteRepository.name}.saveBusiness`,
                    message: `err saving business: ${error.message}`,
                }
            );

        };

    };

    public async saveStakeholderOffer(
        params: {
            businessId: string,
            bidderId: string,
            offer: Offer,
        }
    ) {

        const {
            businessId,
            bidderId,
            offer,
        } = params;

        const {
            amount,
            currency
        } = offer as MonetaryOffer;

        try {

            const saveOfferResponse = await this.client.stakeholderOffer.create(
                {
                    data: {
                        businessId,
                        bidderId,
                        type: offer.type,
                        status: OfferStatusEnum.PENDING,
                        details: {
                            amount,
                            currency
                        } as Prisma.JsonValue,
                    },
                }
            );

            return saveOfferResponse as Omit<typeof saveOfferResponse, "details"> & { details: Record<string, unknown> };

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationWriteRepository.name}.saveBusinessBid`,
                    message: `err saving business bid: ${error.message}`,
                }
            );

        };

    };

    public async updateStakeholderOffer(
        params: {
            offerId: string,
            updateObject: {
                type?: string,
                details?: Record<string, unknown>,
                status?: string,
            }
        }
    ) {

        const {
            offerId,
            updateObject,
        } = params;

        try {

            const updateOfferResponse = await this.client.stakeholderOffer.update(
                {
                    where: {
                        id: offerId,
                    },
                    data: updateObject as Omit<typeof updateObject, "details"> & { details: Prisma.JsonValue },
                }
            );

            return updateOfferResponse as Omit<typeof updateOfferResponse, "details"> & { details: Record<string, unknown> };

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationWriteRepository.name}.updateStakeholderOffer`,
                    message: `err updating offer: ${error.message}`,
                }
            );

        };

    };

    public async updateStakeholderStatus(
        params: {
            businessId: string,
            role: string,
            stakeholderId: string,
            updateObject: {
                status?: string,
            }
        }
    ) {

        const {
            businessId,
            stakeholderId,
            role,
            updateObject,
        } = params;

        try {

            const updateStakeholderStatusResponse = await this.client.businessStakeholder.update(
                {
                    where: {
                        businessId_role_stakeholderId: {
                            businessId,
                            role,
                            stakeholderId,
                        }
                    },
                    data: {
                        status: updateObject?.status
                    }
                }
            );

            return updateStakeholderStatusResponse;

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationWriteRepository.name}.updateStakeholderStatus`,
                    message: `err updating stakeholder status: ${error.message}`,
                }
            );

        };

    };

};