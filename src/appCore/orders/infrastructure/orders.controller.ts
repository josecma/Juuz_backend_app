import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../application/orders.service';
import {
    createSwagger,
    deleteSwagger,
    findOneSwagger,
    findSwagger,
    updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import {
    UpdateOrderDto,
    OrderDto,
    UpdateReferedOrderDto,
} from '../domain/order.dtos';
import { PaginationOrderDto } from '../domain/pagination-order.dto';
import { OrderEntity } from '../domain/order.entity';
import { $Enums, Prisma, VehicleType } from '@prisma/client';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { OrderApkDto } from '../domain/orderApk.dtos';
import { Public } from 'src/modules/auth/src/presentation/decorators/public.route.decorator';

const controllerName = 'Orders';
@ApiTags('Orders')
@Public()
@Controller({
    path: 'orders/',
    version: '1',
})
export class OrdersController {
    constructor(private readonly service: OrdersService) { }

    /**
     * Creates a order.
     * @param body DTO of the creation of a order.
     * @returns The created order or an error.
     */

    @HttpCode(HttpStatus.CREATED)
    @ApiResponseSwagger(createSwagger(OrderEntity, controllerName))
    @Post()
    createOrder(
        @Body() body: OrderDto | OrderApkDto,
        @Request() req: RequestUserId
    ): Promise<OrderEntity> {
        body['status'] = $Enums.OrderStatusEnum.PENDING;
        body['subStatus'] = $Enums.OrderSubStatus.UPCOMING;
        return this.service.createOrder(body, '1', '1');
    }

    @Get('vehicle-types')
    getAllVehicleTypes(): string[] {
        return Object.values(VehicleType);
    }

    /**
     * Gets all orders. It allows to filter by any field contained in the DTO object of the order.
     * @param page Number of the page to retrieve.
     * @param limit Limit of orders to retrieve.
     * @param filter Filter of the orders to be retrieved in stringified JSON format.
     * @returns orders that match a given filter or an error.
     */

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findSwagger(OrderEntity, controllerName))
    @Get()
    async findAll(
        @Query() pagination: PaginationOrderDto
    ): Promise<PaginatedResponse<any>> {
        const result = await this.service.findAll({
            skip: pagination.page,
            take: pagination.perPage,
            where: {
                ...(pagination.status ? { status: pagination.status } : {}),
            },
            select: this.service.select,
            orderBy: {
                createdAt: 'desc',
            },
            // where: {
            //   userId: req.user.id,
            // },
        });
        return result;
    }

    /**
     * Gets a order by id.
     * @param id ID of the order to retrieve.
     * @returns Order that matches the given id or an error.
     */

    @HttpCode(HttpStatus.OK)
    @ApiResponseSwagger(findOneSwagger(OrderEntity, controllerName))
    @Get(':id')
    findOne(@Param('id') id: string): Promise<OrderEntity> {
        // return this.service.findOrderPhoto({
        //   ...this.service.filter(id),
        //   select: this.service.select,
        // });
        return null;
    }

    /**
     * Updates a order. It allows to update any field contained in the DTO object of the order.
     * @param id ID of the order to update.
     * @param UpdateOrderDto Object containing the fields to update.
     * @returns The updated order or an error.
     */

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(updateSwagger(OrderEntity, controllerName))
    @Patch(':id')
    updateOrder(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto
    ): Promise<OrderEntity> {
        const { destination, departure, ...data } = updateOrderDto;
        let orderUpdateInput: Prisma.OrderUpdateInput = { ...data };
        // if (
        //   updateOrderDto.status &&
        //   (updateOrderDto.status === $Enums.OrderStatusEnum.CANCELLED ||
        //     updateOrderDto.status === $Enums.OrderStatusEnum.UPCOMING)
        // ) {
        //   await this.service.channelOrderCancel(id, 'Cancel');
        //   orderUpdateInput.ablyChannel = {
        //     set: [],
        //   };
        // }

        return this.service.updateOrder(this.service.filter(id), {
            data: orderUpdateInput,
            where: { id: id },
        });
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(updateSwagger(OrderEntity, controllerName))
    @Patch('referred/:id')
    updateReferredOrder(
        @Param('id') id: string,
        @Body() updateReferedOrderDto: UpdateReferedOrderDto,
        @Request() req: RequestUserId
    ): Promise<OrderEntity> {
        return this.service.updateReferredOrder(
            id,
            req.user.companyId,
            req.user.id,
            updateReferedOrderDto
        );
    }

    /**
     * Deletes a order by id.
     * @param id ID of the order to delete.
     * @returns Null or an error.
     */

    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponseSwagger(deleteSwagger(OrderEntity, controllerName))
    @Delete(':id')
    async deleteOrder(@Param('id') id: string): Promise<OrderEntity> {
        return this.service.remove(
            this.service.filter(id),
            this.service.filter(id)
        );
    }
}
