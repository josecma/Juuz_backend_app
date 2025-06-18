import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import Request from "src/modules/shared/src/types/types";
import OpenBusinessUseCase from "../../application/useCases/open.business.use.case";
import { ApiOpenBusinessDoc } from "../docs/decorators/api.open.business.doc";
import AcceptBusinessRequestBody from "../dtos/accept.business.request.body";
import OpenBusinessRequestBody from "../dtos/open.business.request.body";
import ServiceCarrierOfferRequestBody from "../dtos/service.carrier.offer.request.body";

@Controller(
    {
        path: "/negotiations/v2",
        version: "v2"
    }
)
export default class NegotiationController {

    public constructor(
        private readonly openBusinessUseCase: OpenBusinessUseCase,
    ) { };

    @ApiOpenBusinessDoc()
    @Post()
    public async openBusiness(
        @Req() req: Request,
        @Body() body: OpenBusinessRequestBody,
        @Res() res: Response
    ) {

        const {
            companyId,
            shipperId,
            orderId,
        } = body;

        const userId = req.user.id;

        try {

            const openBusinessResponse = await this.openBusinessUseCase.execute(
                {
                    objects: [
                        {
                            type: 'SERVICE.CARRIER',
                            id: orderId,
                        }
                    ],
                    stakeholders: [
                        {
                            id: shipperId,
                            type: 'USER',
                            role: 'SHIPPER'
                        },
                        {
                            id: companyId,
                            type: 'COMPANY',
                            role: 'CARRIER',
                        }
                    ]
                }
            );

            res
                .status(201)
                .json(
                    {
                        payload: openBusinessResponse,
                        message: "business opened successfully"
                    }
                );

        } catch (error) {

            res
                .status(500)
                .json(
                    {
                        error
                    }
                );

        };

    };

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

    @Post("/accept")
    public async acceptBusiness(
        @Req() req: Request,
        @Body() body: AcceptBusinessRequestBody,
        @Res() res: Response
    ) {

        const {
            negotiationId
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