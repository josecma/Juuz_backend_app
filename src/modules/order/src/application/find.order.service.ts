import { Inject, Injectable } from "@nestjs/common";
import OrderRepository from "../infrastructure/order.repository";

@Injectable()
export default class FindOrderService {

    public constructor(
        @Inject(OrderRepository)
        private readonly orderRepository: OrderRepository,
    ) { };

    public async execute(params: { ids: number[]; }) {

        const { ids } = params;

        try {

            const orders = await this.orderRepository.find({ ids });

            return orders;

        } catch (error) {

            throw new Error(error);

        };

    };

};