import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import BusinessMapper from "../mappers/business.mapper";
import BusinessStakeholderMapper from "../mappers/business.stakeholder.mapper";
import StakeholderOfferMapper from "../mappers/stakeholder.offer.mapper";

@Injectable({})
export default class NegotiationReadRepository {

    private readonly logger = new Logger(NegotiationReadRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async findBusinessByStakeholderIdAndObjectId(
        params: {
            stakeholderIds: Array<string>,
            objectIds: Array<string>,
        }
    ) {

        const {
            stakeholderIds,
            objectIds,
        } = params;

        try {

            const business = await this.client.business.findFirst(
                {
                    where: {
                        objects: {
                            every: {
                                objectId: {
                                    in: objectIds,
                                }
                            }
                        },
                        stakeholders: {
                            every: {
                                stakeholderId: {
                                    in: stakeholderIds
                                }
                            }
                        }
                    },
                    include: {
                        stakeholders: true,
                        objects: true,
                        offers: true,
                    }
                },
            );

            return business != null ? BusinessMapper.to(business) : null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationReadRepository.name}.findBusinessByStakeholderIdAndObjectId`,
                    message: `err finding business: ${error.message}`,
                }
            );

        };

    };

    public async findBusinessById(
        businessId: string,
    ) {

        try {

            const business = await this.client.business.findUnique(
                {
                    where: {
                        id: businessId,
                    },
                    include: {
                        stakeholders: true,
                        objects: true,
                        offers: true,
                    }
                },
            );

            return business != null ? BusinessMapper.to(business) : null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationReadRepository.name}.findBusinessById`,
                    message: `err finding business: ${error.message}`,
                }
            );

        };

    };

    public async findBusiness(
        params: {
            stakeholderIds: Array<string>,
            objectIds: Array<string>,
            status: string,
        }
    ) {

        const {
            stakeholderIds,
            objectIds,
            status,
        } = params;

        try {

            const business = await this.client.business.findFirst(
                {
                    where: {
                        status,
                        objects: {
                            every: {
                                objectId: {
                                    in: objectIds,
                                }
                            }
                        },
                        stakeholders: {
                            every: {
                                stakeholderId: {
                                    in: stakeholderIds
                                }
                            }
                        }
                    },
                    include: {
                        stakeholders: true,
                        objects: true,
                        offers: true,
                    }
                },
            );

            return business != null ? BusinessMapper.to(business) : null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationReadRepository.name}.findBusiness`,
                    message: `err finding business: ${error.message}`,
                }
            );

        };

    };

    // public async findBusinessStakeholders(
    //     params: {
    //         stakeholderIds: Array<string>,
    //         objectIds: Array<string>,
    //         status: string,
    //     }
    // ) {

    //     const {
    //         stakeholderIds,
    //         objectIds,
    //         status,
    //     } = params;

    //     try {

    //         const business = await this.client.business.findFirst(
    //             {
    //                 where: {
    //                     status,
    //                     objects: {
    //                         every: {
    //                             objectId: {
    //                                 in: objectIds,
    //                             }
    //                         }
    //                     },
    //                     stakeholders: {
    //                         every: {
    //                             stakeholderId: {
    //                                 in: stakeholderIds
    //                             }
    //                         }
    //                     }
    //                 },
    //                 select: {
    //                     stakeholders: true,
    //                 }
    //             },
    //         );

    //         return business.stakeholders.map(s => BusinessStakeholderMapper.to(s));

    //     } catch (error) {

    //         this.logger.error(
    //             {
    //                 source: `${NegotiationReadRepository.name}.findBusiness`,
    //                 message: `err finding business: ${error.message}`,
    //             }
    //         );

    //     };

    // };

    public async findOneBusinessStakeholder(
        params: {
            businessId: string
            stakeholderId: string,
        }
    ) {

        const {
            businessId,
            stakeholderId,
        } = params;

        try {

            const businessStakeholder = await this.client.businessStakeholder.findFirst(
                {
                    where: {
                        business: {
                            id: businessId,
                        },
                        stakeholderId,
                    },
                },
            );

            return businessStakeholder ? BusinessStakeholderMapper.to(businessStakeholder) : null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationReadRepository.name}.findBusiness`,
                    message: `err finding business: ${error.message}`,
                }
            );

        };

    };

    public async findBusinessStakeholders(
        businessId: string
    ) {

        try {

            const businessStakeholder = await this.client.businessStakeholder.findMany(
                {
                    where: {
                        business: {
                            id: businessId,
                        },
                    },
                },
            );

            return businessStakeholder.map(s => BusinessStakeholderMapper.to(s));

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationReadRepository.name}.findBusiness`,
                    message: `err finding business: ${error.message}`,
                }
            );

        };

    };

    public async findBusinessStakeholdersCounterpart(
        params: {
            businessId: string,
            stakeholderId: string,
        }
    ) {

        const {
            businessId,
            stakeholderId,
        } = params;

        try {

            const businessStakeholder = await this.client.businessStakeholder.findMany(
                {
                    where: {
                        business: {
                            id: businessId,
                        },
                        stakeholderId: {
                            notIn: [stakeholderId]
                        }
                    },
                },
            );

            return businessStakeholder.map(s => BusinessStakeholderMapper.to(s));

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationReadRepository.name}.findBusiness`,
                    message: `err finding business: ${error.message}`,
                }
            );

        };

    };

    // public async findMyLatestOffer(
    //     params: {
    //         businessId: string,
    //         stakeholderId: string,
    //     }
    // ) {

    //     const {
    //         businessId,
    //         stakeholderId,
    //     } = params;

    //     try {

    //         const businessStakeholder = await this.client.businessStakeholder.findMany(
    //             {
    //                 where: {
    //                     business: {
    //                         id: businessId,
    //                     },
    //                     stakeholderId: {
    //                         notIn: [stakeholderId]
    //                     }
    //                 },
    //             },
    //         );

    //         return businessStakeholder.map(s => BusinessStakeholderMapper.to(s));

    //     } catch (error) {

    //         this.logger.error(
    //             {
    //                 source: `${NegotiationReadRepository.name}.findBusiness`,
    //                 message: `err finding business: ${error.message}`,
    //             }
    //         );

    //     };

    // };

    public async findLatestOffer(
        params: {
            businessId: string,
            stakeholderId: string,
        }
    ) {

        const {
            businessId,
            stakeholderId,
        } = params;

        try {

            const findLatestOfferResponse = await this.client.stakeholderOffer.findFirst(
                {
                    where: {
                        business: {
                            id: businessId,
                        },
                        stakeholder: {
                            stakeholderId,
                        },
                    },
                    orderBy: {
                        offerAt: "desc"
                    }
                },
            );

            return findLatestOfferResponse ? StakeholderOfferMapper.to(findLatestOfferResponse) : null;

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationReadRepository.name}.findLatestOffer`,
                    message: `err finding latest offer: ${error.message}`,
                }
            );

        };

    };

};