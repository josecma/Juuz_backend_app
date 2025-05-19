import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { OrderStatsDto } from '../domain/orderStats.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}
  async getOrdersStats(): Promise<OrderStatsDto> {
    const [result] = await this.prismaService.$queryRaw<OrderStatsDto[]>`
      SELECT
        COUNT(*) AS "total",
        SUM(CASE WHEN status IN ('IN_TRANSIT','ASSIGNED') THEN 1 ELSE 0 END) AS "inTransitOrAssign",
        SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS "pending",
        SUM(CASE WHEN status = 'HISTORY' THEN 1 ELSE 0 END) AS "history"
      FROM "Order";
    `;

    return {
      total: Number(result.total),
      inTransitOrAssign: Number(result.inTransitOrAssign),
      pending: Number(result.pending),
      history: Number(result.history),
    };
  }
}
