import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import Request from "src/modules/shared/src/types/types";
import ServiceCarrierOfferRequestBody from "../dtos/service.carrier.offer.request.body";

@Controller(
    {
        path: "/negotiations/v2",
        version: "v2"
    }
)
export default class NegotiationController {

    public constructor() { };

    @Post("/offer")
    public async makeOffer(
        @Req() req: Request,
        @Body() body: ServiceCarrierOfferRequestBody,
        @Res() res: Response
    ) {

        const {
            companyId,
            to,
            price,
            orderId,
        } = body;

        const userId = req.user.id;

        try {


        } catch (error) {

            res
                .status(500)
                .json({ error });

        };

    };

};