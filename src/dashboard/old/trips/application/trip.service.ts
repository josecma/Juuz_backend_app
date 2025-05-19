import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationTripDto } from '../domain/pagination-trip.dto';
import { OrdersService } from 'src/appCore/orders/application/orders.service';
import { OrderEntity } from 'src/appCore/orders/domain/order.entity';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

@Injectable()
export class TripsService {
  constructor(readonly ordersService: OrdersService) {}

  select: Prisma.OrderSelect = {
    id: true,
    userId: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
    version: true,
    ownerId: true,
    companyId: true,
  };

  async findAllTrips(
    pagination: PaginationTripDto,
    companyId: number
  ): Promise<PaginatedResponse<OrderEntity>> {
    const where: Prisma.OrderWhereInput = {
      ...(pagination.userId !== undefined && { userId: pagination.userId }),
      ...(pagination.name !== undefined && {
        name: pagination.name,
      }),
      companyId: companyId,
    };

    return this.ordersService.findAll({
      where,
      select: this.select,
      take: pagination.perPage,
      skip: pagination.page,
    });
  }

  async tripsAttention() {
    const tripsCount = await this.ordersService.model.groupBy({
      by: ['name'],
      _count: {
        name: true,
      },
    });

    const formattedResult = tripsCount.map((trip) => ({
      name: trip.name,
      count: trip._count.name,
    }));

    return formattedResult;
  }
}
