import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { $Enums, Prisma } from '@prisma/client';
import { ComunicationEntity } from '../domain/comunication.entity';
import { OrdersService } from 'src/appCore/orders/application/orders.service';
import { OfertComunicationDto } from '../domain/ofertMessage.dtos';
import { ComunicationDto } from '../domain/comunication.dtos';
import { AblyService } from 'src/_shared/providers/ably/application/ably.service';

@Injectable()
export class ComunicationsService extends PrismaGenericService<
  ComunicationEntity,
  Prisma.ComunicationCreateArgs,
  Prisma.ComunicationFindUniqueArgs,
  Prisma.ComunicationUpdateArgs,
  Prisma.ComunicationDeleteArgs,
  Prisma.ComunicationFindManyArgs
> {
  private readonly logger = new Logger(ComunicationsService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ordersService: OrdersService,
    private readonly ablyService: AblyService
  ) {
    super(prismaService.comunication);
  }
  select: Prisma.OrderSelect = {
    user: {
      select: {
        ablyChannel: {
          select: {
            channelName: true,
          },
        },
      },
    },
  };

  async getAblyNameChannel(orderId: number): Promise<number> {
    const order: any = await this.ordersService.findOne({
      where: { id: orderId },
      select: this.select,
    });
    return order.user.ablyChannel.name;
  }

  async createIfNotExist(driverComunicationDto: OfertComunicationDto) {
    const filter: Prisma.ComunicationFindUniqueArgs = {
      where: {
        orderId: driverComunicationDto.orderId,
        riderChanelId: driverComunicationDto.channelId,
      },
    };
    const comunicationExist = await this.model.findUnique(filter);
    if (!comunicationExist) {
      const dataComunications: ComunicationDto = {
        orderId: driverComunicationDto.orderId,
        driverChanelId: driverComunicationDto.channelId,
        riderChanelId: await this.getAblyNameChannel(
          driverComunicationDto.orderId
        ),
        numberOfComunications: 0,
      };
      return await this.create({ data: { ...dataComunications, ownerId: 1 } });
    }
  }

  async driverComunication(
    driverComunicationDto: OfertComunicationDto
  ): Promise<void> {
    await this.createIfNotExist(driverComunicationDto);
    const comunication = await this.findOne({
      where: {
        orderId: driverComunicationDto.orderId,
        driverChanelId: driverComunicationDto.channelId,
      },
    });
    if (comunication.status === $Enums.ComunicationEnum.CLOSE)
      throw new NotFoundException('The Channel is closed.');
    if (comunication.numberOfComunications > 6)
      throw new NotFoundException(
        'You have already attempted the maximum number of communications.'
      );
    if (comunication.numberOfComunications % 2 !== 0)
      throw new NotFoundException(
        'You have to wait for the rider to respond to you.'
      );
    await this.update(this.filter(driverComunicationDto.channelId.toString()), {
      data: {
        numberOfComunications: comunication.numberOfComunications + 1,
      },
      where: { id: comunication.id },
    });
    // await this.ablyService.publishMessage(
    //   comunication.riderChanelId.toString(),
    //   'OFERT',
    //   +driverComunicationDto.ofert,
    // );
  }

  async riderComunication(
    riderComunicationDto: OfertComunicationDto
  ): Promise<void> {
    const comunication = await this.findOne({
      where: {
        orderId: riderComunicationDto.orderId,
        riderChanelId: riderComunicationDto.channelId,
      },
    });
    if (comunication.status === $Enums.ComunicationEnum.CLOSE)
      throw new NotFoundException('The Channel is closed.');
    if (comunication.numberOfComunications > 6)
      throw new NotFoundException(
        'You have already attempted the maximum number of communications.'
      );
    if (comunication.numberOfComunications % 2 !== 1)
      throw new NotFoundException(
        'You have to wait for the driver to respond to you.'
      );
    await this.update(this.filter(riderComunicationDto.channelId.toString()), {
      data: {
        numberOfComunications: comunication.numberOfComunications + 1,
      },
      where: { id: comunication.id },
    });
    // await this.ablyService.publishMessage(
    //   comunication.driverChanelId.toString(),
    //   'OFERT',
    //   `ofert: ${+riderComunicationDto.ofert}}`,
    // );
  }
}
