import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Query,
    Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NegotiationStatus, OrderStatusEnum, Prisma } from '@prisma/client';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { RequestUserId } from 'src/_shared/domain/requestId';
import {
    findOneSwagger,
    findSwagger,
    updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import FindOneOrderByIdUseCase from 'src/modules/order/src/application/useCases/find.one.order.by.id.use.case';
import FinishOrderUseCase from 'src/modules/order/src/application/useCases/finish.order.use.case';
import StartOrderUseCase from 'src/modules/order/src/application/useCases/start.order.use.case';
import { OrdersService } from '../application/orders.service';
import { OrderEntity } from '../domain/order.entity';
import { PaginationAssingOrderDto } from '../domain/pagination-assing-order.dto';
import { PaginationOrderCarrierDto } from '../domain/pagination-orderCarrier.dto';

const controllerName = 'Orders';
@ApiTags('Order_Carriers')
@Controller({
    path: 'orders_carriers/',
    version: '1',
})
export class OrdersCarrierController {
    constructor(
        private readonly service: OrdersService,
        private readonly findOneOrderByIdUseCase: FindOneOrderByIdUseCase,
        private readonly startOrderUseCase: StartOrderUseCase,
        private readonly finishOrderUseCase: FinishOrderUseCase,
    ) { }

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findSwagger(OrderEntity, controllerName))
    @Get('applyings')
    carrierApplying(
        @Query() pagination: PaginationOrderCarrierDto,
        @Request() req: RequestUserId
    ): Promise<PaginatedResponse<OrderEntity>> {

        const skip = (pagination.page - 1) * pagination.perPage;

        const find: Prisma.OrderFindManyArgs = {
            skip,
            take: pagination.perPage,
            select: this.service.select,
            where: {
                status: pagination.status,
                Negotiation: {
                    some: {
                        driverId: req.user.id,
                        status: pagination.NegotiationStatus,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        };

        return this.service.findAll(find);

    }

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findSwagger(OrderEntity, controllerName))
    @Get('asigned_orders')
    async asignedOrders(
        @Query() pagination: PaginationAssingOrderDto,
        @Request() req: RequestUserId
    ): Promise<any> {
        try {

            const orders = await this.service.find({
                userId: req.user.id,
                pagination: {
                    take: pagination.perPage,
                    skip: pagination.page,
                },
                orderStatus: pagination.status
                    ? pagination.status
                    : OrderStatusEnum.ASSIGNED,
                negotiationStatus: NegotiationStatus.CLOSE,
            });

            return orders;
        } catch (error) {

            return error;
        }
    }

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findSwagger(OrderEntity, controllerName))
    @Get('noApplyings')
    noCarrierApplying(
        @Query() pagination: PaginationOrderCarrierDto,
        @Request() req: RequestUserId
    ): Promise<PaginatedResponse<OrderEntity>> {

        const skip = (pagination.page - 1) * pagination.perPage;

        const find: Prisma.OrderFindManyArgs = {
            skip,
            take: pagination.perPage,
            select: this.service.select,
            where: {
                status: pagination.status,
                Negotiation: {
                    none: {
                        driverId: req.user.id,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        };

        return this.service.findAll(find);
    }

    /**
     * Updates a order. It allows to update any field contained in the DTO object of the order.
     * @param id ID of the order to update.
     * @param UpdateOrderDto Object containing the fields to update.
     * @returns The updated order or an error.
     */

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(updateSwagger(OrderEntity, controllerName))
    @Patch('start/:id')
    public async updateOrder(
        @Param('id') id: string,
        @Request() req: RequestUserId
    )
    // : Promise<OrderEntity>
    {

        try {

            const res = await this.startOrderUseCase.execute(
                {
                    orderId: id,
                    userId: req.user.id.toString(),
                }
            );

            return res;

        } catch (error) {

            throw error;

        };
        // const dataUpdate: Prisma.OrderUpdateArgs = {
        //   data: { status: OrderStatusEnum.IN_TRANSIT, subStatus: OrderSubStatus.STARTED },
        //   where: {
        //     id: +id,
        //     status: OrderStatusEnum.ASSIGNED,
        //     // companyId: req.user.companyId,
        //     driverId: req.user.id,
        //   },
        //   select: this.service.select,
        // };

        // return this.service.updateOrder(this.service.filter(id), dataUpdate);

    }

    /**
     * Updates a order. It allows to update any field contained in the DTO object of the order.
     * @param id ID of the order to update.
     * @param UpdateOrderDto Object containing the fields to update.
     * @returns The updated order or an error.
     */

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(updateSwagger(OrderEntity, controllerName))
    @Patch('apk/finished/:id')
    public async updateFinishedOrder(@Param('id') id: string, @Request() req: RequestUserId) {
        try {

            const res = await this.finishOrderUseCase.execute(
                {
                    orderId: id,
                    userId: req.user.id.toString(),
                }
            );

            return res;

        } catch (error) {

            throw error;

        };
    }

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findOneSwagger(OrderEntity, controllerName))
    @Get(':id')
    public async findOneById(
        @Param('id') id: string,
        @Request() req: RequestUserId
    ) {

        try {

            const res = await this.findOneOrderByIdUseCase.execute(
                {
                    orderId: id,
                    role: 'CARRIER',
                    userId: req.user.id.toString(),
                }
            );

            return res;

        } catch (error) {

            throw error;

        };

    };

};
