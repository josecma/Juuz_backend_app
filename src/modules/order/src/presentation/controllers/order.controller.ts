import { Body, Controller, Post, Req, Res, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import Request from "src/modules/shared/src/types/types";
import PostOrderUseCase from "../../application/useCases/post.order.use.case";
import PostOrderRequestBody from "../dtos/post.order.request.body";
import PostOrderFormDataInterceptor from "../interceptors/post.order.form.data.interceptor";

@ApiTags("orders:v2")
@Controller(
    {
        path: '/orders/v2',
        version: "v2"
    }
)
export default class OrderController {

    public constructor(
        private readonly postOrderUseCase: PostOrderUseCase,
    ) { };

    @Post()
    @UseInterceptors(
        AnyFilesInterceptor(),
        PostOrderFormDataInterceptor
    )
    public async postOrder(
        @Body() body: PostOrderRequestBody,
        @Req() req: Request,
        @Res() res: Response,
    ) {

        const ownerId = req.user.id;

        const { items, ...postOrderRest } = body;

        try {

            const postOrderResponse = await this.postOrderUseCase.execute(
                {
                    ownerId,
                    items,
                    ...postOrderRest
                }
            );

            res.status(201).json(postOrderResponse);

        } catch (error) {

            res.status(500).json({ error });

        };

    };

};