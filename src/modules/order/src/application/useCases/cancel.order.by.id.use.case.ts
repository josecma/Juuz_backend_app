import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
import FindOneOrderByIdService from "../../domain/services/find.one.order.by.id.service";
import OrderRepository from "../../infrastructure/order.repository";

@Injectable({})
export default class CancelOrderByIdUseCase {

    public constructor(
        @Inject(FindOneUserByIdService)
        private readonly findOneUserByIdService: FindOneUserByIdService,
        @Inject(FindOneOrderByIdService)
        private readonly findOneOrderByIdService: FindOneOrderByIdService,
        @Inject(OrderRepository)
        private readonly orderRepository: OrderRepository,
    ) { };

    public async execute(
        params: {
            orderId: string;
            userId: string;
        }
    ): Promise<{
        msg: string;
        content: any;
    }> {

        const { userId, orderId } = params;

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

            if (!(order.userId === user.id)) {

                throw new NotFoundException(`order with id: ${order.id} not found`);

            };

            const cancelledOrder = await this.orderRepository.update(
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