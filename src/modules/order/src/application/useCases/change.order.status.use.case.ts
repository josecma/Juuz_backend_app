import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import GetPrivateUserChannelByUserIdUseCase from "src/modules/shared/src/application/useCases/get.private.user.channel.by.user.id.use.case";
import AblyAdapter from "src/modules/shared/src/infrastructure/adapters/ably.adapter";
import UpdateOrderUseCase from "./update.order.use.case";

@Injectable({})
export default class ChangeOrderStatusUseCase {

    private readonly logger = new Logger(ChangeOrderStatusUseCase.name);

    public constructor(
        private readonly ablyAdapter: AblyAdapter,
        private readonly updateOrderUseCase: UpdateOrderUseCase,
        private readonly getPrivateUserChannelByUserIdUseCase: GetPrivateUserChannelByUserIdUseCase,
    ) { };

    public async execute(
        params: {
            id: string,
            updateObj: {
                status?: string,
                subStatus?: string,
            },
        }
    ) {

        try {

            const updatedOrder = await this.updateOrderUseCase.execute(
                params
            );

            const shipperPrivateChannel = await this.getPrivateUserChannelByUserIdUseCase.execute({ userId: updatedOrder?.ownerId.toString() });

            const driverPrivateChannel = await this.getPrivateUserChannelByUserIdUseCase.execute({ userId: updatedOrder?.driverId.toString() });


            await this.ablyAdapter.publishMessage(
                shipperPrivateChannel.content.channels[0].name,
                {
                    order: {
                        id: updatedOrder.id,
                        status: updatedOrder.status,
                        subStatus: updatedOrder.subStatus,
                    }
                },
                'OrderStatusChange'
            );

            await this.ablyAdapter.publishMessage(
                driverPrivateChannel.content.channels[0].name,
                {
                    order: {
                        id: updatedOrder.id,
                        status: updatedOrder.status,
                        subStatus: updatedOrder.subStatus,
                    }
                },
                'OrderStatusChange'
            );

            return updatedOrder;

        } catch (error) {

            this.logger.error(
                {
                    source: `${ChangeOrderStatusUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };
};