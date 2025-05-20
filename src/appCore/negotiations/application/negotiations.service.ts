import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { $Enums, DescriptionMessageEnum, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { AblyAction, AblyStatus } from 'src/_shared/domain/enum/ably.enum';
import { driverNegotion } from 'src/_shared/domain/variable/dirverNegotiation.variable';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { AblyService } from 'src/_shared/providers/ably/application/ably.service';
import { MassagesService } from 'src/appCore/messages/application/messages.service';
import {
    NegotiationDto,
    UpdateNegotiationDto,
} from '../domain/negotiation.dtos';
import { NegotiationEntity } from '../domain/negotiation.entity';

@Injectable()
export class NegotiationsService extends PrismaGenericService<
    NegotiationEntity,
    Prisma.NegotiationCreateArgs,
    Prisma.NegotiationFindUniqueArgs,
    Prisma.NegotiationUpdateArgs,
    Prisma.NegotiationDeleteArgs,
    Prisma.NegotiationFindManyArgs
> {
    private readonly logger = new Logger(NegotiationsService.name);
    constructor(
        private readonly prismaService: PrismaService,
        // private readonly ablyService: AblyService,
        private readonly messagesService: MassagesService,
    ) {
        super(prismaService.negotiation);
    }
    select: Prisma.NegotiationSelect = {
        // driver: driverNegotion,
    };

    selectSend: Prisma.NegotiationSelect = {
        id: true,
        userId: true,
        driverId: true,
        orderId: true,
        offerCarrier: true,
        counterOfferShipper: true,
        order: true,
        // user: {
        //     select: {
        //         ablyChannel: {
        //             select: {
        //                 channelName: true,
        //             },
        //         },
        //     },
        // },
        // driver: {
        //     select: {
        //         ablyChannel: {
        //             select: {
        //                 channelName: true,
        //             },
        //         },
        //     },
        // },
    };

    async createSend(
        body: NegotiationDto,
        driverId: string,
        companyId: string,
    ): Promise<NegotiationEntity> {
        const data: any = await this.create({
            data: {
                ...body,
                driverId: driverId,
                lastNegotiaton: $Enums.LastNegotiatonEnums.CARRIER,
            },
            select: this.selectSend,
        });
        const channelName = data.userId;
        const createMessage: Prisma.MessageCreateArgs = {
            data: {
                companyId: companyId,
                ownerId: channelName,
                negotiationId: data.id,
                description: DescriptionMessageEnum.CARRIER_OFERT,
                userId: body.userId.toString(),
            },
        };
        await this.messagesService.create(createMessage);
        // await this.ablyService.sendMessage(body.userId + '', {
        //   negatationId: data.id,
        //   status: AblyStatus.Negotiation,
        //   action: AblyAction.Message,
        //   description: DescriptionMessageEnum.CARRIER_OFERT,
        // });
        return data;
    }

    async updateSend(
        updateNegotiationDto: UpdateNegotiationDto,
        orderId: string,
        userId: string,
        // logType: $Enums.RolesEnum,
        companyId: string
    ): Promise<NegotiationEntity> {
        const where: Prisma.NegotiationWhereUniqueInput = { id: orderId };
        let descriptionMessage: DescriptionMessageEnum;
        // if (logType === $Enums.RolesEnum.COMPANY) {
        if (updateNegotiationDto.counterOfferShipper)
            throw new UnauthorizedException(
                'You are not authorized to perform this action.'
            );
        updateNegotiationDto['lastNegotiaton'] =
            $Enums.LastNegotiatonEnums.CARRIER;
        where['driverId'] = userId.toString();
        descriptionMessage = DescriptionMessageEnum.SHIPPER_OFERT;
        // } 

        // else if (logType === $Enums.RolesEnum.SHIPPER) {
        if (updateNegotiationDto.offerCarrier)
            throw new UnauthorizedException(
                'You are not authorized to perform this action.'
            );
        updateNegotiationDto['lastNegotiaton'] =
            $Enums.LastNegotiatonEnums.SHIEPER;
        where['userId'] = userId.toString();
        descriptionMessage = DescriptionMessageEnum.CARRIER_OFERT;
        // }

        const data: any = await this.update(this.filter(orderId), {
            data: updateNegotiationDto,
            where: where,
            select: this.selectSend,
        });
        // const channelName =
        //     logType === $Enums.RolesEnum.COMPANY ? data.userId : data.driverId;
        // const createMessage: Prisma.MessageCreateArgs = {
        //     data: {
        //         companyId: companyId,
        //         ownerId: channelName,
        //         negotiationId: data.id,
        //         description: descriptionMessage,
        //         userId: channelName,
        //     },
        // };
        // await this.messagesService.create(createMessage);
        // await this.ablyService.sendMessage(channelName, {
        //     negatationId: data.id,
        //     status: AblyStatus.Negotiation,
        //     action: AblyAction.Message,
        //     description: descriptionMessage,
        // });
        return data;
    }
}
