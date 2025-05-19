import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { findOneSwagger } from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { OrderStatsDto } from '../domain/orderStats.dto';
import { OrdersService } from '../application/orders.service';

const controllerName = 'Dashboard Order';

@ApiTags('dashboard/order')
@Controller({
  path: 'dashboard/order',
  version: '1',
})
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  /**
   * Gets a order by id.
   * @param id ID of the order to retrieve.
   * @returns Company that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(OrderStatsDto, controllerName))
  @Get('/info-orders')
  async findOrders(): Promise<OrderStatsDto> {
    return this.service.getOrdersStats();
  }
}
