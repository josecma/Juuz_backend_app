import { OfferTypeEnum } from "../enums/offer.type.enum";
import Offer from "./offer";

export default class MonetaryOffer extends Offer {

    public constructor(
        public readonly currency: string,
        public readonly amount: number,
    ) {

        super(OfferTypeEnum.MONETARY);
    };

    public toString() {

        return `${this.amount} ${this.currency}`;

    };

    public toJSON() {

        return {
            currency: this.currency,
            amount: this.amount,
        };

    };

};