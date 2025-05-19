import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
import FindOneOrderByIdService from "../../domain/services/find.one.order.by.id.service";
import ChangeOrderStatusUseCase from "./change.order.status.use.case";

@Injectable({})
export default class CancelOrderByIdUseCase {

    public constructor(
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
        @Inject(FindOneOrderByIdService)
        private readonly findOneOrderByIdService: FindOneOrderByIdService,
        private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
    ) { };

    public async execute(
        params: {
            orderId: string;
            userId: string;
        }
    ) {

        const {
            userId,
            orderId,
        } = params;

        try {

            const order = await this.findOneOrderByIdService.find(
                {
                    id: orderId,
                }
            );

            const user = await this.findOneUserByIdService.find(
                {
                    id: userId,
                }
            );

            if (!(order.ownerId === user.id)) {

                throw new NotFoundException(`order not found`);

            };

            const cancelledOrder = await this.changeOrderStatusUseCase.execute(
                {
                    id: orderId,
                    updateObj: {
                        status: "HISTORY",
                        subStatus: "CANCELLED",
                    },
                }
            );

            return {
                msg: "order cancelled successfully",
                content: {
                    before: order,
                    after: cancelledOrder,
                },
            };

        } catch (error) {

            throw error;

        };

    };

};