import { Body, Controller, Post, Req, Res, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Public } from "src/modules/auth/src/presentation/decorators/public.route.decorator";
import Request from "src/modules/shared/src/types/types";
import PostOrderUseCase from "../../application/useCases/post.order.use.case";
import PostOrderRequestBody from "../dtos/post.order.request.body";
import PostOrderFormDataInterceptor from "../interceptors/post.order.form.data.interceptor";

@Public()
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

        const shipperId = req.user.id;

        const { items, ...postOrderRest } = body;

        try {

            this.postOrderUseCase.execute(
                {
                    shipperId,
                    items,
                    ...postOrderRest
                }
            );

            res.status(201).json(body);

        } catch (error) {

            res.status(500).json({ error });

        };

    };

};