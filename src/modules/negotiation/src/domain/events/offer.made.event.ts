import DomainEvent from "src/modules/shared/src/domain/entities/domain.event";
import { BusinessStakeholder } from "../types/business.stakeholder";
import MonetaryOffer from "../valueObjects/monetary.offer";

export default class OfferMadeEvent extends DomainEvent {

    readonly businessId: string;
    readonly madeBy: string;
    readonly stakeholders: Array<BusinessStakeholder<unknown>>;
    readonly occurredAt: Date;
    readonly offer: MonetaryOffer;
    static readonly eventName = 'offer.made';

    public constructor(
        params: {
            businessId: string,
            offer: MonetaryOffer;
            madeBy: string,
            stakeholders: Array<BusinessStakeholder<unknown>>,
            occurredAt: Date;
        }
    ) {

        const {
            businessId,
            madeBy,
            stakeholders,
            offer,
            occurredAt
        } = params;

        super();

        this.madeBy = madeBy;
        this.offer = offer;
        this.stakeholders = stakeholders;
        this.businessId = businessId;
        this.occurredAt = occurredAt;

    };

};