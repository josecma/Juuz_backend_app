import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import {
  OrderStatusEnum,
  OrderSubStatus,
  PaymentMethodType,
  PaymentStatus,
  Prisma,
} from '@prisma/client';
import { PaymentEntity } from '../domain/payment.entity';
import {
  GroupBy,
  PaginationPaymentDto,
} from '../domain/pagination-payment.dto';
import { StripeService } from 'src/_shared/providers/stripe/application/stripe.service';
import { OrdersService } from 'src/appCore/orders/application/orders.service';
import { PaymentCashDto, PaymentDto } from '../domain/payment.dtos';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PaymentsService extends PrismaGenericService<
  PaymentEntity,
  Prisma.PaymentCreateArgs,
  Prisma.PaymentFindUniqueArgs,
  Prisma.PaymentUpdateArgs,
  Prisma.PaymentDeleteArgs,
  Prisma.PaymentFindManyArgs
> {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => StripeService))
    private readonly stripeService: StripeService,
    private readonly ordersService: OrdersService
  ) {
    super(prismaService.payment);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Para probar el codigo real
  async checkPayments(): Promise<void> {
    console.log('Checking Payment');
    const begDate: Date = new Date(); //  Fecha de hoy a las 00:00
    const endDate: Date = new Date(); // Fecha de hoy a las 23:59
    // Fecha a las 00:00 del día actual
    begDate.setHours(0, 0, 0, 0);
    // Fecha a las 23:59 del día actual
    endDate.setHours(23, 59, 59, 999);

    const closedPayments = await this.model.payment.findMany({
      // Busca los payments que tengan como fecha limite de pago el dia de hoy y ya hayan sido pagados por el usuario
      where: {
        status: PaymentStatus.COMPLETED,
        depositDate: {
          lte: endDate,
          gte: begDate,
        },
      },
    });

    // (await closedPayments).forEach((payment) => this.applyDiscount(payment)); // Aplica el descuento a cada payment encontrado
  }

  async findAllPayments(
    data: Prisma.PaymentFindManyArgs,
    pagination: PaginationPaymentDto
  ) {
    const { startDate, endDate, groupBy } = pagination;
    let result: any;
    switch (groupBy) {
      case GroupBy.DAY:
        result = await this.prismaService.$queryRaw<
          { date: string; totalYtdGross: number; totalNetBalance: number }[]
        >`
          SELECT 
            TO_CHAR(DATE_TRUNC('day', "created_at"), 'DD-MM-YYYY') AS date,
            SUM("ytdGross") as "totalYtdGross",
            SUM("netBalance") as "totalNetBalance"
          FROM 
            "Payment"
          WHERE 
            "created_at" >= ${new Date(startDate)}
            AND "created_at" <=${new Date(endDate)}
          GROUP BY 
            DATE_TRUNC('day', "created_at")
          ORDER BY 
            DATE_TRUNC('day', "created_at");
        `;
        break;
      case GroupBy.WEEK:
        result = await this.prismaService.$queryRaw<
          { date: string; totalYtdGross: number; totalNetBalance: number }[]
        >`
        WITH weekly_totals AS (
          SELECT 
            TO_CHAR(DATE_TRUNC('week', "created_at"), 'DD-MM-YYYY') AS date,
            SUM("ytdGross") as "totalYtdGross",
            SUM("netBalance") as "totalNetBalance"
          FROM 
            "Payment"
          WHERE 
            "created_at" >= ${new Date(startDate)}
            AND "created_at" <= ${new Date(endDate)}
          GROUP BY 
            DATE_TRUNC('week', "created_at")
          ORDER BY 
            DATE_TRUNC('week', "created_at")
        )
        SELECT 
          date,
          "totalYtdGross",
          "totalNetBalance"
        FROM 
          weekly_totals
        UNION ALL
        SELECT 
          'Total',
          SUM("totalYtdGross"),
          SUM("totalNetBalance")
        FROM 
          weekly_totals;
        `;
        break;
      case GroupBy.MONTH:
        result = await this.prismaService.$queryRaw<
          { date: string; totalYtdGross: number; totalNetBalance: number }[]
        >`
        WITH month_totals AS (
          SELECT 
            TO_CHAR(DATE_TRUNC('month', "created_at"), 'DD-MM-YYYY') AS date,
            SUM("ytdGross") as "totalYtdGross",
            SUM("netBalance") as "totalNetBalance"
          FROM 
            "Payment"
          WHERE 
            "created_at" >= ${new Date(startDate)}
            AND "created_at" <= ${new Date(endDate)}
          GROUP BY 
            DATE_TRUNC('month', "created_at")
          ORDER BY 
            DATE_TRUNC('month', "created_at")
        )
        SELECT 
          date,
          "totalYtdGross",
          "totalNetBalance"
        FROM 
          month_totals
        UNION ALL
        SELECT 
          'Total',
          SUM("totalYtdGross"),
          SUM("totalNetBalance")
        FROM 
          month_totals;
      `;
        break;
      case GroupBy.YEAR:
        result = await this.prismaService.$queryRaw<
          { date: string; totalYtdGross: number; totalNetBalance: number }[]
        >`
        WITH year_totals AS (
          SELECT 
            TO_CHAR(DATE_TRUNC('year', "created_at"), 'DD-MM-YYYY') AS date,
            SUM("ytdGross") as "totalYtdGross",
            SUM("netBalance") as "totalNetBalance"
          FROM 
            "Payment"
          WHERE 
            "created_at" >= ${new Date(startDate)}
            AND "created_at" <= ${new Date(endDate)}
          GROUP BY 
            DATE_TRUNC('year', "created_at")
          ORDER BY 
            DATE_TRUNC('year', "created_at")
        )
        SELECT 
          date,
          "totalYtdGross",
          "totalNetBalance"
        FROM 
          year_totals
        UNION ALL
        SELECT 
          'Total',
          SUM("totalYtdGross"),
          SUM("totalNetBalance")
        FROM 
          year_totals;
        `;
        break;
    }

    const transformedData = {
      data: result.slice(0, -1),
      totalYtdGross: result[result.length - 1].totalYtdGross,
      totalNetBalance: result[result.length - 1].totalNetBalance,
    };
    return transformedData;
  }

  async createLogicCarrierPayment(
    body: PaymentCashDto,
    companyId,
    userId
  ): Promise<PaymentEntity | { url: string }> {
    const find: Prisma.OrderFindUniqueArgs = {
      where: {
        id: body.orderId,
        userId: userId,
        status: OrderStatusEnum.IN_TRANSIT,
      },
    };
    const order = await this.ordersService.model.findUnique(find);
    if (!order) throw new BadRequestException('Invalid order id');

    const payment = this.createPayment(
      companyId,
      userId,
      PaymentMethodType.CASH,
      body.orderId,
      order.price
    );
    const data: Prisma.OrderUpdateArgs = {
      data: {
        status: OrderStatusEnum.HISTORY,
        subStatus: OrderSubStatus.COMPLETE,
        departure: {
          update: {
            isActive: false,
          },
        },
        destination: {
          update: {
            isActive: false,
          },
        },
      },
      ...find,
    };

    await this.ordersService.update(find, data);
    return payment;
  }

  async createLogicShipperPayment(
    body: PaymentDto,
    companyId,
    userId
  ): Promise<PaymentEntity | { url: string }> {
    const { paymentMethodType, orderId, ...data } = body;
    if (
      paymentMethodType === PaymentMethodType.QUICK_DEPOSIT ||
      paymentMethodType === PaymentMethodType.WEEKLY_DEPOSIT
    ) {
      throw new BadRequestException('Invalid payment method type');
    }

    const find: Prisma.OrderFindUniqueArgs = {
      where: {
        id: orderId,
        userId: userId,
        status: OrderStatusEnum.IN_TRANSIT,
      },
    };
    const order = await this.ordersService.model.findUnique(find);
    if (!order) throw new BadRequestException('Invalid order id');

    if (paymentMethodType === PaymentMethodType.CARD) {
      const stripePaymentUrl = await this.stripeService.createStripePaymentUrl(
        orderId,
        userId,
        companyId,
        paymentMethodType,
        data.amount
      );
      return { url: stripePaymentUrl.url };
    } else {
      const payment = this.createPayment(
        companyId,
        userId,
        paymentMethodType,
        orderId,
        body.amount
      );
      await this.ordersService.update(find, {
        data: {
          status: OrderStatusEnum.HISTORY,
          departure: {
            update: {
              isActive: false,
            },
          },
          destination: {
            update: {
              isActive: false,
            },
          },
        },
        ...find,
      });
      return payment;
    }
  }

  async createPayment(
    companyId,
    userId,
    paymentMethodType,
    orderId,
    amount,
    paymentDate?
  ) {
    const futureDate = new Date(paymentDate);
    futureDate.setDate(paymentDate.getDate() + 7);
    const paymentCreate: Prisma.PaymentCreateInput = {
      amount: amount,
      paymentDate: paymentDate,
      paymentMethod: {
        connect: {
          name_companyId: { name: paymentMethodType, companyId: companyId },
        },
      },
      company: {
        connect: { id: companyId },
      },
      user: {
        connect: { id: userId },
      },
      order: {
        connect: { id: orderId },
      },
      depositDate: futureDate,
    };
    return this.create({
      data: paymentCreate,
    });
  }

  async paymentNow(id: string, companyId: number) {
    const sd = await this.findOne(this.companyFilter(id, companyId));
  }
}
