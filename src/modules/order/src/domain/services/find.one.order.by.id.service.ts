import { Inject, Injectable } from "@nestjs/common";
import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import OrderRepository from "../../infrastructure/order.repository";

@Injectable({})
export default class FindOneOrderByIdService {

    public constructor(
        @Inject(OrderRepository)
        private readonly orderRepository: OrderRepository,
    ) { };

    public async find(
        params: {
            id: string;
        }
    ) {

        const { id } = params;

        try {

            if (!id) {

                throw new BadRequestDomainException(
                    {
                        message: "order id is required",
                        source: `${FindOneOrderByIdService.name}`,
                    }
                );

            };

            const order = await this.orderRepository.findOneBy({ id });

            if (!order) {

                throw new NotFoundDomainException(
                    {
                        message: `order with id:${id} not found`,
                    }
                );

            };

            return order;

        } catch (error) {

            throw error;

        };

    };

};