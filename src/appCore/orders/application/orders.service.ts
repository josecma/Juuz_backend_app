import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import {
  $Enums,
  DescriptionMessageEnum,
  OrderStatusEnum,
  Prisma,
  TypePointEnum,
  NegotiationStatus,
} from '@prisma/client';
import { OrderEntity } from '../domain/order.entity';
import { AblyService } from 'src/_shared/providers/ably/application/ably.service';
import { AblyAction, AblyStatus } from 'src/_shared/domain/enum/ably.enum';
import { PointsService } from 'src/appCore/points/application/points.service';
import { PointDto } from 'src/appCore/points/domain/point.dtos';
import { DriverAcceptOrderFilterDto } from '../domain/driverAcceptOrderFilterDto.dto';
import { UpdateReferedOrderDto } from '../domain/order.dtos';
import { UsersService } from 'src/appCore/users/application/users.service';
import { VehicleOrderDto } from '../domain/vehicleOrder.dto';
import { MassagesService } from 'src/appCore/messages/application/messages.service';
import { S3Service } from 'src/s3/aplication/s3.service';
import { toCamelCase } from 'src/utils/to.camel.case';
import { Order } from 'src/appCore/points/domain/types';

@Injectable()
export class OrdersService extends PrismaGenericService<
  OrderEntity,
  Prisma.OrderCreateArgs,
  Prisma.OrderFindUniqueArgs,
  Prisma.OrderUpdateArgs,
  Prisma.OrderDeleteArgs,
  Prisma.OrderFindManyArgs
> {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ablyService: AblyService,
    private readonly pointsService: PointsService,
    private readonly usersService: UsersService,
    private readonly messagesService: MassagesService,
    private readonly s3Service: S3Service,
  ) {
    super(prismaService.order);
  }

  select: Prisma.OrderSelect = {
    id: true,
    driverId: true,
    userId: true,
    status: true,
    milles: true,
    email: true,
    note: true,
    phone: true,
    firstName: true,
    lastName: true,
    emailSecond: true,
    phoneSecond: true,
    firstNameSecond: true,
    lastNameSecond: true,
    photos: {
      select: {
        id: true,
        name: true,
      },
    },
    information: true,
    reason: true,
    pickUpDate: true,
    pricePerMile: true,
    deliveryDate: true,
    carCount: true,
    aditionalInfo: true,
    paymentMethod: true,
    createdAt: true,
    departure: {
      select: {
        city: true,
        address: true,
        state: true,
        pointName: true,
        id: true,
        longitude: true,
        latitude: true,
      },
    },
    destination: {
      select: {
        city: true,
        address: true,
        state: true,
        pointName: true,
        id: true,
        longitude: true,
        latitude: true,
      },
    },
    price: true,
    subStatus: true,
    subService: {
      select: {
        name: true,
        Service: {
          select: {
            name: true,
          },
        },
      },
    },
    VehicleOrder: {
      select: {
        id: true,
        qty: true,
        vehicleColor: true,
        licensePlate: true,
        lastNumber: true,
        stateProvince: true,
        state: true,
        year: true,
        vehicleType: true,
        additionalVehicleInformation: true,
        trailerType: true,
        wideLoad: true,
        model: {
          select: {
            id: true,
            name: true,
            brand: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    },
    Negotiation: true,
  };

  private async validateOrderData(body: any, data: any) {
    if (
      body.isAssistanceRequestForNow &&
      (body.pickUpDate || body.deliveryDate)
    ) {
      throw new BadRequestException(
        'If it is fast assistance, pickUpDate and deliveryDate cannot be passed'
      );
    }

    if (data.pickUpDate && !data.deliveryDate) {
      throw new BadRequestException(
        'Both pickUpDate and deliveryDate must be provided'
      );
    }
  }

  private buildOrderData(
    body: any,
    data: any,
    ownerId: string,
    companyId: string,
    photoIds: string[],
    vehicleOrders: VehicleOrderDto[]
  ) {
    const today = new Date();
    const expirationTime = new Date();
    expirationTime.setDate(today.getDate() + 7);

    // const { departure, coords } = body.departure;
    // const { departure, coords } = body.destination;

    return {
      data: {
        departure: {
          create: {
            ...body.departure,
            ownerId,
            type: TypePointEnum.DEPARTURE,
          },
        },
        destination: {
          create: {
            ...body.destination,
            ownerId,
            type: TypePointEnum.DESTINATION,
          },
        },
        photos: {
          connect: photoIds ? photoIds.map((id) => ({ id })) : undefined,
        },
        serviceId: body.serviceId,
        expirationTime,
        subServiceId: body.subServiceId,
        status: body.status,
        subStatus: body.subStatus,
        carCount: vehicleOrders.length,
        paymentMethod: body.paymentMethod,
        price: body.price,
        note: body.note,
        ownerId,
        userId: ownerId,
        email: data.email,
        phone: data.phone,
        milles: data.milles,
        firstName: data.firstName,
        lastName: data.lastName,
        emailSecond: data.emailSecond,
        phoneSecond: data.phoneSecond,
        firstNameSecond: data.firstNameSecond,
        lastNameSecond: data.lastNameSecond,
        VehicleOrder: {
          create: vehicleOrders.map((order: VehicleOrderDto) => ({
            qty: order.qty,
            vehicleColor: order.vehicleColor,
            licensePlate: order.licensePlate,
            lastNumber: order.lastNumber,
            stateProvince: order.stateProvince,
            model: {
              connect: {
                id: order.modelId,
              },
            },
            ownerId,
            state: order.state,
            isTheKeysWithTheVehicle: order.isTheKeysWithTheVehicle,
            additionalVehicleInformation: order.additionalVehicleInformation,
            trailerType: order.trailerType,
            wideLoad: order.wideLoad,
            vehicleType: order.vehicleType,
          })),
        },
        companyId,
      },
      select: this.select,
    };
  }

  async createOrder(
    body, //: OrderDto | OrderApkDto,
    ownerId: number,
    companyId: number
  ): Promise<OrderEntity> {
    body['status'] = $Enums.OrderStatusEnum.PENDING;
    body['subStatus'] = $Enums.OrderSubStatus.UPCOMING;

    const { service, photoIds, vehicleOrders, ...data } = body;
    if (data.email === null && data.phone === null) {
      throw new BadRequestException(
        'You must provide exactly one of the fields: phone or email.'
      );
    }
    // body.departure.driverId = null;
    // body.destination.driverId = null;
    const departureId = await this.createPoint(
      body.departure,
      ownerId,
      TypePointEnum.DEPARTURE
    );
    const destinationId = await this.createPoint(
      body.destination,
      ownerId,
      TypePointEnum.DESTINATION
    );
    const today = new Date();
    const orderData: Prisma.OrderCreateArgs = {
      data: {
        photos: {
          connect: photoIds ? photoIds.map((id) => ({ id })) : undefined,
        },
        serviceId: body.serviceId,
        expirationTime: new Date(today.setDate(today.getDate() + 7)),
        subServiceId: body.subServiceId,
        status: body.status,
        subStatus: body.subStatus,
        carCount: vehicleOrders.length,
        paymentMethod: body.paymentMethod,
        price: body.price,
        note: body.note,
        ownerId: ownerId,
        userId: ownerId,
        departureId: departureId,
        destinationId: destinationId,
        email: data.email,
        phone: data.phone,
        milles: data.milles,
        firstName: data.firstName,
        lastName: data.lastName,
        emailSecond: data.emailSecond,
        phoneSecond: data.phoneSecond,
        firstNameSecond: data.firstNameSecond,
        lastNameSecond: data.lastNameSecond,
        VehicleOrder: {
          create: vehicleOrders.map((order: VehicleOrderDto) => ({
            qty: order.qty,
            year: order.year,
            vehicleColor: order.vehicleColor,
            licensePlate: order.licensePlate,
            lastNumber: order.lastNumber,
            stateProvince: order.stateProvince,
            model: {
              connect: {
                id: order.modelId,
              },
            },
            ownerId: ownerId,
            state: order.state,
            isTheKeysWithTheVehicle: order.isTheKeysWithTheVehicle,
            additionalVehicleInformation: order.additionalVehicleInformation,
            trailerType: order.trailerType,
            wideLoad: order.wideLoad,
            vehicleType: order.vehicleType,
          })),
        },
        companyId: companyId,
      },
      select: this.select,
    };
    if (data.pickUpDate) {
      orderData.data.deliveryDate = data.deliveryDate;
      orderData.data.pickUpDate = data.deliveryDate;
    }
    if (body.isAssistanceRequestForNow) {
      if (body.pickUpDate || body.deliveryDate)
        throw new BadRequestException(
          'If it is fast assistance, pickUpDate and deliveryDate cannot be passed'
        );
      orderData.data['isAssistanceRequestForNow'] =
        body.isAssistanceRequestForNow;
    }

    const result: any = await this.create(orderData);

    await this.pointsService.updatePoint(departureId, { orderId: result.id });
    await this.pointsService.updatePoint(destinationId, { orderId: result.id });

    await this.findDriverIdsNearby(
      data.departure.coords.latitude,
      data.departure.coords.longitude,
      5,
      // service.serviceName,
      // service.subServiceName,
      null,
      null,
      result.id
    );
    result['departure'] = await this.pointsService.findOne(result.departureId);
    result['destination'] = await this.pointsService.findOne(
      result.destinationId
    );
    delete result.departureId;
    result.destinationId;
    return result;
  }

  async findDriverIdsNearby(
    latitude: number,
    longitud: number,
    distance: number,
    serviceName: $Enums.ServiceEnum,
    subServiceName: $Enums.SubServiceEnum,
    orderId: string
  ): Promise<any[]> {
    const informationPoint = await this.pointsService.findPointsWithinDistance(
      latitude,
      longitud,
      distance
    );
    return informationPoint.map(async (ablyChannel) => {
      await this.ablyService.sendMessage(ablyChannel.userId, {
        // serviceName: serviceName,
        // subServiceName: subServiceName,
        orderId: orderId,
        status: AblyStatus.Order,
        action: AblyAction.Create,
      });
      return { id: ablyChannel.id };
    });
  }

  public async find(
    params: {
      userId: number,
      pagination: {
        skip: number;
        take: number;
      },
      orderStatus: OrderStatusEnum;
      negotiationStatus: NegotiationStatus;
    }) {

    try {

      const { userId, pagination, orderStatus, negotiationStatus } = params;
      const { take, skip } = pagination;

      const offset = (skip - 1) * take;

      const query = `
      SELECT 
        o.*, 
        COALESCE(json_agg(DISTINCT vo.*) FILTER (WHERE vo.id IS NOT NULL), '[]') AS vehicles, 
        COALESCE(json_agg(DISTINCT n.*) FILTER (WHERE n.id IS NOT NULL), '[]') AS negotiations,
        COALESCE(json_agg(DISTINCT jsonb_build_object('id', ph.id, 'name', ph.name, 'url', null)) 
                 FILTER (WHERE ph.id IS NOT NULL), '[]'
        ) AS photos,
        to_jsonb(dep.*) as departure,
        to_jsonb(dest.*) as destination,
        to_jsonb(u.*) as user
      FROM "Order" as o 
      LEFT JOIN (SELECT 
                  v.*,
                  to_jsonb(mo.*) as model
                  FROM "VehicleOrder" as v
                  LEFT JOIN (SELECT
                              m.*,
                              to_jsonb(b.*) as brand
                              FROM "Model" as m
                              LEFT JOIN "Brand" as b ON b.id = m.brand_id
                              GROUP BY m.id, b.id) as mo ON v.model_id = mo.id) as vo ON o.id = vo.order_id
      LEFT JOIN "Negotiation" as n ON o.id = n.order_id
      LEFT JOIN "Point" as dep ON o.departure_id = dep.id 
      LEFT JOIN "Point" as dest ON o.destination_id= dest.id
      LEFT JOIN "Photo" as ph ON o.id=ph.order_id
      LEFT JOIN "User" as u ON o.user_id=u.id
      WHERE n.driver_id = \$1
      AND o.status = \$2::text::"OrderStatusEnum"
      AND n.status = \$3::text::"NegotiationStatus"
      GROUP BY o.id, dep.id, dest.id, u.id
      ORDER BY o.created_at DESC
      LIMIT \$4 OFFSET \$5;`;

      const rawData: Order[] = await this.prismaService.$queryRawUnsafe(
        query,
        userId,
        orderStatus,
        negotiationStatus,
        take,
        offset
      );

      const finalResult = await Promise.all(
        rawData.map(async (raw) => {
          return {
            ...raw,
            photos: await Promise.all(
              raw.photos.map(async (photo) => ({
                ...photo,
                url: await this.s3Service.getSignedUrl(photo.name),
              }))
            )
          };
        })
      );

      return toCamelCase(finalResult);

    } catch (error) {

      throw new Error(error);

    };

  };

  async updateAcceptOrder(
    id: string,
    userId: number,
    logType: $Enums.RolesEnum,
    filter: DriverAcceptOrderFilterDto,
    companyId: number
  ) {
    if (logType !== $Enums.RolesEnum.SHIPPER)
      throw new UnauthorizedException(
        'You are not authorized to perform this action.'
      );
    const userFilter: Prisma.OrderFindUniqueArgs = {
      select: {
        Negotiation: true,
      },
      where: {
        id: +id,
        status: $Enums.OrderStatusEnum.PENDING,
        Negotiation: {
          some: {
            userId: userId,
            driverId: filter.driverId,
            orderId: +id,
          },
        },
      },
    };

    const order: any = await this.findOne(userFilter);

    const userFind: Prisma.UserFindUniqueArgs = {
      where: { id: filter.driverId },
      select: {
        driver: true,
        id: true,
      },
    };

    const user: any = await this.usersService.findOne(userFind);

    const dataUpdate: Prisma.OrderUpdateArgs = {
      data: {
        status: $Enums.OrderStatusEnum.ASSIGNED,
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
        // FleetRecord: {
        //   create: {
        //     vinNumber: user.driver.vinNumber,
        //     vehicleType: user.driver.vehicleType,
        //     vehicleInfoId: user.driver.vehicleInfoId,
        //     ownerId: user.id,
        //   },
        // },
        subStatus: $Enums.OrderSubStatus.ASSIGNED,
        driverId: filter.driverId,
        companyId: companyId,
        price:
          order.Negotiation[0].lastNegotiaton ===
            $Enums.LastNegotiatonEnums.CARRIER
            ? order.Negotiation[0].offerCarrier
            : order.Negotiation[0].counterOfferShipper,
        Negotiation: {
          updateMany: {
            data: {
              status: $Enums.NegotiationStatus.CLOSE,
            },
            where: {
              id: order.Negotiation[0].id,
            },
          },
        },
      },
      where: { id: +id },
    };

    const data = await this.update(this.filter(id), dataUpdate);
    const createMessage: Prisma.MessageCreateArgs = {
      data: {
        companyId: companyId,
        ownerId: filter.driverId,
        orderId: +id,
        description: DescriptionMessageEnum.ACCEPT_ORDER,
        userId: filter.driverId,
      },
    };
    await this.messagesService.create(createMessage);
    await this.ablyService.sendMessage(filter.driverId + '', {
      orderId: id,
      status: AblyStatus.Order,
      action: AblyAction.Accept,
      description: DescriptionMessageEnum.ACCEPT_ORDER,
    });
    return data;
  }

  async updateFinishedOrder(
    id: string,
    userId: number,
    logType: $Enums.RolesEnum,
    companyId: number
  ) {
    const userFilter: Prisma.OrderFindUniqueArgs = {
      where: {
        id: +id,
        status: $Enums.OrderStatusEnum.IN_TRANSIT,
        // Negotiation: {
        //   some: {
        //     driverId: userId,
        //     orderId: +id,
        //   },
        // },
      },
    };

    const userUpdate: Prisma.OrderUpdateArgs = {
      select: {
        Negotiation: true,
        userId: true,
      },
      where: userFilter.where,
      data: {
        status: $Enums.OrderStatusEnum.HISTORY,
        subStatus: $Enums.OrderSubStatus.COMPLETE,
      },
    };
    const order: OrderEntity = await this.update(userFilter, userUpdate);

    const createMessage: Prisma.MessageCreateArgs = {
      data: {
        companyId: companyId,
        ownerId: order.userId,
        orderId: +id,
        description: DescriptionMessageEnum.FINISH_ORDER,
        userId: order.userId,
      },
    };
    await this.messagesService.create(createMessage);
    await this.ablyService.sendMessage(order.userId + '', {
      orderId: id,
      status: AblyStatus.CARRIER,
      action: AblyAction.On_LOCATION,
      description: DescriptionMessageEnum.FINISH_ORDER,
    });
  }

  // async channelOrderCancel(id: string, text: string) {
  //   const orderChannel = (await this.findOne({
  //     where: { id: +id },
  //     select: {
  //       ablyChannel: true,
  //     },
  //   })) as any;
  //   const channelNames: string[] = [];
  //   // orderChannel.ablyChannel.forEach((channel) => {
  //   //   this.ablyservice.publishMessage(channel.name, 'Cancel Order', id);
  //   // });
  // }

  private async createPoint(
    createPointDto: PointDto,
    owerId: number,
    typePoint?: TypePointEnum
  ): Promise<number> {
    return await this.pointsService.create(createPointDto, owerId, typePoint);
  }

  async updateOrder(
    find: Prisma.OrderFindUniqueArgs,
    update: Prisma.OrderUpdateArgs
  ): Promise<OrderEntity> {
    // if (update.data.status === $Enums.OrderStatusEnum.IN_TRANSIT)
    //   find.where['status'] = $Enums.OrderStatusEnum.PENDING;
    // if (update.data.status === $Enums.OrderStatusEnum.HISTORY)
    //   find.where['status'] = $Enums.OrderStatusEnum.IN_TRANSIT;
    // update.data.orderPhotos = orderPhotos;
    return this.update(find, update);
  }

  async updateReferredOrder(
    id: string,
    companyId: number,
    referredId: number,
    updateReferedOrderDto: UpdateReferedOrderDto
  ): Promise<OrderEntity> {
    const userFilter: Prisma.UserFindManyArgs = {
      where: {
        userCompanyRoles: {
          some: {
            userId: updateReferedOrderDto.userId,
            companyId: companyId,
          },
        },
      },
      select: {
        driver: true,
        id: true,
      },
    };
    const users: any = await this.usersService.findAll(userFilter);

    if (!users.data[0])
      throw new BadRequestException('The user does not belong to the company.');
    // const channelName = users.data[0].ablyChannel.channelName;
    const createMessage: Prisma.MessageCreateArgs = {
      data: {
        companyId: companyId,
        ownerId: referredId,
        orderId: +id,
        description: DescriptionMessageEnum.REFER_ORDER,
        userId: updateReferedOrderDto.userId,
      },
    };
    await this.messagesService.create(createMessage);
    await this.ablyService.sendMessage(updateReferedOrderDto.userId + '', {
      orderId: id,
      status: AblyStatus.Order,
      action: AblyAction.Refered_Order,
      description: DescriptionMessageEnum.REFER_ORDER,
    });
    const find: Prisma.OrderWhereUniqueInput = {
      OR: [
        { status: OrderStatusEnum.IN_TRANSIT },
        { status: OrderStatusEnum.ASSIGNED },
      ],
      id: +id,
      companyId: companyId,
    };
    return this.update(this.filter(id), {
      data: {
        driverId: updateReferedOrderDto.userId,
        referredId: referredId,
        FleetRecord: {
          update: {
            vinNumber: users.data[0].driver.vinNumber,
            vehicleType: users.data[0].driver.vehicleType,
            vehicleInfoId: users.data[0].driver.vehicleInfoId,
            ownerId: users.data[0].id,
          },
        },
      },
      where: find,
    });
  }

  // async pointIsAblyActive(updatePointDto: UpdateOrderPointDto, id: string) {
  //   const update: Prisma.OrderUpdateArgs = {
  //     where: {
  //       id: +id,
  //     },
  //     data: {
  //       Negotiation: {
  //         update: {
  //           where: {
  //             id: updatePointDto.negotiationId,
  //           },
  //           data: {
  //             driver: {
  //               update: {
  //                 drivers: {
  //                   update: {
  //                     point: {
  //                       update: {
  //                         data: {
  //                           isActive: updatePointDto.isActive,
  //                         },
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   };

  //   await this.update(this.filter(id + ''), update);
  // }
}
