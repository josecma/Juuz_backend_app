import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  Request
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { $Enums, OrderStatusEnum, Prisma } from '@prisma/client';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { RequestUserId } from 'src/_shared/domain/requestId';
import {
  createSwagger,
  findOneSwagger,
  // findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { PointsService } from 'src/appCore/points/application/points.service';
import CancelOrderByIdUseCase from 'src/modules/order/src/application/useCases/cancel.order.by.id.use.case';
import { OrdersService } from '../application/orders.service';
import { DriverAcceptOrderFilterDto } from '../domain/driverAcceptOrderFilterDto.dto';
import { OrderDto, UpdateOrderDto } from '../domain/order.dtos';
import { OrderEntity } from '../domain/order.entity';
import { OrderApkDto } from '../domain/orderApk.dtos';
import { PaginationOrderCarrierDto } from '../domain/pagination-orderCarrier.dto';
import { PaginationOrderShieperDto } from '../domain/pagination-orderShieper.dto';

const controllerName = 'Order_Shippers';
@ApiTags('Order_Shippers')
@Controller({
  path: 'orders_shippers/',
  version: '1',
})
export class OrdersShipperController {
  constructor(
    private readonly service: OrdersService,
    private readonly pointsService: PointsService,
    private readonly cancelOrderByIdUseCase: CancelOrderByIdUseCase,
  ) { }

  /**
   * Creates a order.
   * @param body DTO of the creation of a order.
   * @returns The created order or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(OrderEntity, controllerName))
  @Post()
  createOrder(
    @Body() body: OrderDto,
    @Request() req: RequestUserId
  ): Promise<OrderEntity> {
    return this.service.createOrder(body, '' + req.user.id, '');
  }

  /**
   * Creates a order.
   * @param body DTO of the creation of a order.
   * @returns The created order or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(OrderEntity, controllerName))
  @Post('apk')
  async createOrderApk(
    @Body() body: OrderApkDto,
    @Request() req: RequestUserId
  ): Promise<OrderEntity> {
    body['status'] = $Enums.OrderStatusEnum.PENDING;
    body['subStatus'] = $Enums.OrderSubStatus.UPCOMING;
    return await this.service.createOrder(
      body,
      '' + req.user.id,
      ''
    );
  }

  // /**
  //  * Gets all orders. It allows to filter by any field contained in the DTO object of the order.
  //  * @param page Number of the page to retrieve.
  //  * @param limit Limit of orders to retrieve.
  //  * @param filter Filter of the orders to be retrieved in stringified JSON format.
  //  * @returns orders that match a given filter or an error.
  //  */

  // @HttpCode(HttpStatus.OK)
  // @ApiResponseSwagger(findSwagger(OrderEntity, controllerName))
  // @Get()
  // findAll(
  //   @Query() pagination: PaginationOrderDto
  //   // @Request() req: RequestUserId
  // ): Promise<PaginatedResponse<OrderEntity>> {
  //   return this.service.findAll({
  //     skip: pagination.page,
  //     take: pagination.perPage,
  //     select: this.service.select,
  //     // where: {
  //     //   userId: req.user.id,
  //     // },
  //   });
  // }

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(OrderEntity, controllerName))
  @Get('applyings')
  shiepersApplyings(
    @Query() pagination: PaginationOrderCarrierDto,
    @Request() req: RequestUserId
  ): Promise<PaginatedResponse<OrderEntity>> {
    const find: Prisma.OrderFindManyArgs = {
      skip: pagination.page,
      take: pagination.perPage,
      select: this.service.select,
      where: {
        status: pagination.status,
        Negotiation: {
          some: {
            userId: req.user.id.toString(),
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
  @Get()
  shieperOrders(
    @Query() pagination: PaginationOrderShieperDto,
    @Request() req: RequestUserId
  ): Promise<PaginatedResponse<OrderEntity>> {

    const skip = (pagination.page - 1) * pagination.perPage;

    return this.service.findAll({
      skip,
      take: pagination.perPage,
      select: this.service.select,
      where: {
        status: pagination.status,
        userId: req.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Gets a order by id.
   * @param id ID of the order to retrieve.
   * @returns Order that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(OrderEntity, controllerName))
  @Get(':id')
  findOneShieper(
    @Param('id') id: string,
    @Request() req: RequestUserId
  ): Promise<OrderEntity> {
    return this.service.findOne({
      select: this.service.select,
      where: {
        id: id,
        userId: req.user.id.toString(),
      },
    });
  }

  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiResponseSwagger(updateSwagger(OrderEntity, controllerName))
  // @Patch('point/:id')
  // updatePoint(
  //   @Param('id') id: string,
  //   @Body() updatePointDto: UpdateOrderPointDto
  // ) {
  //   return this.service.pointIsAblyActive(updatePointDto, id);
  // }

  /**
   * Updates a order. It allows to update any field contained in the DTO object of the order.
   * @param id ID of the order to update.
   * @param UpdateOrderDto Object containing the fields to update.
   * @returns The updated order or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(OrderEntity, controllerName))
  @Patch('accept/:id')
  updateAcceptOrder(
    @Param('id') id: string,
    @Request() req: RequestUserId,
    @Body() filter: DriverAcceptOrderFilterDto
  ) {
    return this.service.updateAcceptOrder(
      id,
      req.user.id,
      //req.user.logType,
      filter,
      req.user.companyId
    );
  }

  /**
   * Updates a order. It allows to update any field contained in the DTO object of the order.
   * @param id ID of the order to update.
   * @param UpdateOrderDto Object containing the fields to update.
   * @returns The updated order or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(OrderEntity, controllerName))
  @Patch('canceled/:id')
  async updateCanceledOrder(
    @Param('id') id: string,
    @Request() req: RequestUserId,
  ) {

    try {

      return await this.cancelOrderByIdUseCase.execute(
        {
          userId: req.user.id.toString(),
          orderId: id,
        }

      );

    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error);
    };
    // //: Promise<OrderEntity> {
    // if (req.user.logType !== $Enums.RolesEnum.SHIPPER)
    //   throw new UnauthorizedException(
    //     'You are not authorized to perform this action.'
    //   );
    // return this.service.update(this.service.filter(id), {
    //   data: {
    //     ...updateOrderDto,
    //     status: $Enums.OrderStatusEnum.HISTORY,
    //     subStatus: $Enums.OrderSubStatus.CANCELLED,
    //     departure: {
    //       update: {
    //         isActive: false,
    //       },
    //     },
    //     destination: {
    //       update: {
    //         isActive: false,
    //       },
    //     },
    //   },
    //   where: { id: +id, userId: req.user.id, status: OrderStatusEnum.PENDING },
    // });
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
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req: RequestUserId
  ): Promise<OrderEntity> {
    const { destination, departure, photoIds, vehicleOrders, ...data } =
      updateOrderDto;
    // let orderUpdateInput: Prisma.OrderUpdateInput = { ...data };
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
    if (destination) {
      const { id, ...dataDestination } = destination;
      await this.pointsService.updatePoint(id, dataDestination);
    }
    if (departure) {
      const { id, ...dataDeparture } = departure;
      await this.pointsService.updatePoint(id, dataDeparture);
    }

    let existingVehicleOrders, idAndOtherFieldsOrders, newVehicleOrders;
    if (vehicleOrders) {
      existingVehicleOrders = vehicleOrders.filter(
        ({ id }) => id !== null && id !== undefined
      );

      idAndOtherFieldsOrders = vehicleOrders.filter(
        ({ id, ...order }) =>
          id !== null && id !== undefined && Object.keys(order).length > 0
      );

      newVehicleOrders = vehicleOrders.filter(({ id, modelId }) => {
        // Verificamos si id es nulo o indefinido
        if (id === null || id === undefined) {
          // Si modelId no existe, lanzamos un BadRequest
          if (!modelId) {
            throw new BadRequestException(
              'modelId is required for new vehicle orders.'
            );
          }
          return true; // Incluimos el objeto en el nuevo array
        }
        return false; // Excluimos el objeto si id no es nulo o indefinido
      });
    }

    const dataUpdate: Prisma.OrderUpdateArgs = {
      data: {
        ...data,
        photos: {
          connect: photoIds ? photoIds.map((id) => ({ id })) : undefined,
          deleteMany: {
            id: {
              notIn: photoIds ? photoIds : undefined,
            },
          },
        },

        VehicleOrder: {
          upsert: idAndOtherFieldsOrders
            ? idAndOtherFieldsOrders.map(({ id, modelId, ...voData }) => ({
              where: { id },
              // nunca va a suceder
              create: {
                ...voData,
                model: modelId ? { connect: { id: modelId } } : undefined,
                ownerId: req.user.id.toString(),
                companyId: req.user.companyId,
              },
              update: {
                ...voData,
                model: modelId ? { connect: { id: modelId } } : undefined,
              },
            }))
            : undefined,
          create: newVehicleOrders
            ? newVehicleOrders.map(({ modelId, ...voData }) => ({
              ...voData,
              model: { connect: { id: modelId } },
              ownerId: req.user.id.toString(),
              companyId: req.user.companyId,
            }))
            : undefined,
          deleteMany: existingVehicleOrders
            ? {
              id: {
                notIn: existingVehicleOrders.map(({ id }) => id),
              },
            }
            : undefined,
        },
      },
      where: { id: id, status: OrderStatusEnum.PENDING },
      select: this.service.select,
    };

    return this.service.updateOrder(this.service.filter(id), dataUpdate);
  }
}
