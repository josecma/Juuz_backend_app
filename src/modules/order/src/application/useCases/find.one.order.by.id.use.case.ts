import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import OrderRepository from "../../infrastructure/order.repository";

@Injectable({})
export default class FindOneOrderByIdUseCase {

    public constructor(
        @Inject(OrderRepository)
        private readonly orderRepository: OrderRepository,
    ) { };

    public async execute(
        params: {
            id: string;
            pagination?: {
                take: number;
                skip: number;
            };
        }
    ) {

        const { id, pagination } = params;

        try {

            if (!id) {

                throw new Error(`${FindOneOrderByIdUseCase.name}Err: params.id is required.`);

            };

            const order = await this.orderRepository.findOneBy({ id });

            if (!order) {

                throw new NotFoundException(`${FindOneOrderByIdUseCase.name}Err: order with id:${id} does not exist.`);

            };

            if (!order.Negotiation || order.Negotiation.length === 0) {
                return {
                    data: [],
                    pageInfo: {
                        currentPage: 0,
                        totalPages: 0,
                        totalResults: 0,
                    },
                };
            }

            const allNegotiations = order.Negotiation;
            const totalResults = allNegotiations.length;

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

            if (error instanceof NotFoundException) {

                throw error;

            };

            throw error;

        };

    };

};