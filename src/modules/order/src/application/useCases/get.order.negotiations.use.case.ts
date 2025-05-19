import { Injectable, NotFoundException } from "@nestjs/common";
import NegotiationReadRepository from "../../infrastructure/repositories/negotiation.read.repository";
import OrderRepository from "../../infrastructure/order.repository";

@Injectable({})
export default class GetOrderNegotiationsUseCase {

    public constructor(
        private readonly orderRepository: OrderRepository,
    ) { };

    public async execute(
        params: {
            orderId: string;
            pagination?: {
                take: number;
                skip: number;
            };
        }
    ) {

        const {
            orderId,
            pagination
        } = params;

        try {

            const order = await this.orderRepository.findOneBy({ id: orderId });

            const allNegotiations = order.Negotiation;
            const totalResults = order.Negotiation.length;

            if (!pagination) {
                return {
                    data: allNegotiations,
                    pageInfo: {
                        currentPage: 1,
                        totalPages: 1,
                        totalResults: totalResults,
                    },
                };
            };

            const { skip, take } = pagination;
            const paginatedData = allNegotiations.slice(skip, skip + take);

            const currentPage = Math.floor(skip / take) + 1;
            const totalPages = Math.ceil(totalResults / take);

            return {
                data: paginatedData,
                pageInfo: {
                    currentPage: currentPage,
                    totalPages: totalPages,
                    totalResults: totalResults,
                },
            };


        } catch (error) {

            throw error;

        };

    };

};