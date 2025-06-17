import { Injectable, Logger } from "@nestjs/common";
import FindOneCompanyByIdUseCase from "src/modules/company/src/application/useCases/find.one.company.by.id.use.case";
import OrderReadRepository from "src/modules/order/src/infrastructure/repositories/order.read.repository";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import { EventDispatcher } from "src/modules/shared/src/infrastructure/event.dispatcher";
import FindUserByIdUseCase from "src/modules/user/src/application/useCases/find.user.by.id.use.case";
import { OfferStatusEnum } from "../../domain/enums/offer.status.enum";
import OfferMadeEvent from "../../domain/events/offer.made.event";
import MonetaryOffer from "../../domain/valueObjects/monetary.offer";
import NegotiationReadRepository from "../../infrastructure/repositories/negotiation.read.repository";
import NegotiationWriteRepository from "../../infrastructure/repositories/negotiation.write.repository";

@Injectable()
export default class MakeCarrierOfferUseCase {

    private readonly logger = new Logger(MakeCarrierOfferUseCase.name);

    public constructor(
        private readonly orderReadRepository: OrderReadRepository,
        private readonly negotiationWriteRepository: NegotiationWriteRepository,
        private readonly negotiationReadRepository: NegotiationReadRepository,
        private readonly findOneCompanyByIdUseCase: FindOneCompanyByIdUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly eventDispatcher: EventDispatcher,

    ) { };

    public async execute(
        params: {
            offer: MonetaryOffer,
            from: {
                type: string,
                id: string,
                details: {
                    userId: string,
                }
            },
            to: {
                type: string,
                id: string,
            },
            orderId: string,
            businessId: string,
        },
    ) {

        const {
            offer,
            from,
            to,
            orderId,
            businessId,
        } = params;

        try {

            const findOneOrderByIdResponse = await this.orderReadRepository.findOneById(orderId);

            if (findOneOrderByIdResponse == null) {

                throw new NotFoundDomainException(
                    {
                        message: "order not found",
                    }
                );

            } else {

                const { ownerId, ...orderRest } = findOneOrderByIdResponse;

                if (ownerId !== to.id) {

                    throw new NotFoundDomainException(
                        {
                            message: "order not found",
                        }
                    );

                };

                // const findBusinessByIdResponse = await this.negotiationReadRepository.findBusinessById(businessId);

                const fromLatestOffer = await this.negotiationReadRepository.findLatestOffer(
                    {
                        businessId,
                        stakeholderId: from.id,
                    }
                );

                const toLatestOffer = await this.negotiationReadRepository.findLatestOffer(
                    {
                        businessId,
                        stakeholderId: to.id,
                    }
                );

                if (fromLatestOffer != null) {

                    const { offerAt: fromLatestOfferAt } = fromLatestOffer;

                    if (toLatestOffer != null) {

                        const { offerAt: toLatestOfferAt } = toLatestOffer;

                        if (fromLatestOfferAt.getTime() > toLatestOfferAt.getTime()) {

                            await this.negotiationWriteRepository.updateStakeholderOffer(
                                {
                                    offerId: fromLatestOffer.id,
                                    updateObject: {
                                        status: OfferStatusEnum.WITHDRAWN,
                                    }
                                }
                            );

                        } else {

                            await this.negotiationWriteRepository.updateStakeholderOffer(
                                {
                                    offerId: toLatestOffer.id,
                                    updateObject: {
                                        status: OfferStatusEnum.REJECTED,
                                    }
                                }
                            );

                        };

                    } else {

                        await this.negotiationWriteRepository.updateStakeholderOffer(
                            {
                                offerId: fromLatestOffer.id,
                                updateObject: {
                                    status: OfferStatusEnum.WITHDRAWN,
                                }
                            }
                        );

                    };

                };

                await this.negotiationWriteRepository.saveStakeholderOffer(
                    {
                        bidderId: from.id,
                        businessId: businessId,
                        offer,
                    }
                );

                const businessStakeholdersCounterpart = await this.negotiationReadRepository.findBusinessStakeholdersCounterpart(
                    {
                        businessId,
                        stakeholderId: from.id,
                    }
                );

                const company = await this.findOneCompanyByIdUseCase.execute(from.id);

                const user = await this.findUserByIdUseCase.execute(
                    {
                        userId: from.details.userId
                    }
                );

                const offerMadeEvent = new OfferMadeEvent(
                    {
                        businessId,
                        offer,
                        madeBy: from.id,
                        stakeholders: businessStakeholdersCounterpart,
                        occurredAt: new Date(),
                    }
                );

                await this.eventDispatcher.dispatch(offerMadeEvent);

            };

        } catch (error) {

            this.logger.error(
                {
                    source: `${MakeCarrierOfferUseCase.name}`,
                    message: `err making carrier offer: ${error.message}`,
                }
            );

        };

    };

};