import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import OrderRepository from "../../infrastructure/order.repository";
import OrderReadRepository from "../../infrastructure/repositories/order.read.repository";


@Injectable({})
export default class UpdateOrderUseCase {

    private readonly logger = new Logger(UpdateOrderUseCase.name);

    public constructor(
        private readonly orderRepository: OrderRepository,
        private readonly orderReadRepository: OrderReadRepository,
    ) { };

    public async execute(
        params: {
            id: string,
            updateObj: Partial<{
                status?: string,
                subStatus?: string,
            }>,
        }
    ) {

        const {
            id,
            updateObj,
        } = params;

        try {

            const order = await this.orderReadRepository.findOneById(id);

            if (
                !order
            ) {

                throw new NotFoundException('order not found');

            };

            const updatedOrder = await this.orderRepository.update({
                id,
                updateObj,
            });

            return updatedOrder;

        } catch (error) {

            this.logger.error(
                {
                    source: `${UpdateOrderUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };
};