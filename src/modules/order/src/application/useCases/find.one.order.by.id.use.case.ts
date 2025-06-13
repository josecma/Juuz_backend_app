import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import OrderRepository from "../../infrastructure/order.repository";

@Injectable({})
export default class FindOneOrderByIdUseCase {

    private readonly logger = new Logger(FindOneOrderByIdUseCase.name);

    public constructor(
        private readonly orderRepository: OrderRepository,
    ) { };

    public async execute(
        params: {
            orderId: string,
            userId: string,
            role: 'SHIPPER' | 'CARRIER',
        }
    ) {

        const {
            orderId,
            role,
            userId,
        } = params;

        try {

            const order = await this.orderRepository.findOneBy({ id: orderId });

            if (
                !order
                ||
                order.ownerId.toString() !== userId && role === 'SHIPPER'
                ||
                order.driverId.toString() !== userId && role === 'CARRIER'
            ) {

                throw new NotFoundException(`order not found`);

            };

            return order;

        } catch (error) {

            this.logger.error(
                {
                    source: `${FindOneOrderByIdUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};