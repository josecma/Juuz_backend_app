import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import FindOneOrderByIdService from "../domain/services/find.one.order.by.id.service";
import OrderRepository from "../infrastructure/order.repository";

@Injectable({})
export default class UpdateOrderService {

    public constructor(
        @Inject(OrderRepository)
        private readonly orderRepository: OrderRepository,
        @Inject(FindOneOrderByIdService)
        private readonly findOneOrderByIdService: FindOneOrderByIdService,
    ) { };

    public async execute(params: {
        id: string;
        updateObj: Partial<{
            status: string;
            subStatus: string;
        }>;
    }): Promise<void> {

        const { id, updateObj } = params;

        try {

            await this.findOneOrderByIdService.find({ id });

            await this.orderRepository.update({
                id,
                updateObj,
            });

        } catch (error) {

            if (error instanceof NotFoundException) {

                throw error;

            };

            throw new InternalServerErrorException(error);

        };

    };
};