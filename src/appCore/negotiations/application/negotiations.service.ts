// import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// import { $Enums, DescriptionMessageEnum, Prisma } from '@prisma/client';
// import { PrismaService } from 'nestjs-prisma';
// import { AblyAction, AblyStatus } from 'src/_shared/domain/enum/ably.enum';
// import { driverNegotion } from 'src/_shared/domain/variable/dirverNegotiation.variable';
// import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
// import { AblyService } from 'src/_shared/providers/ably/application/ably.service';
// import { MassagesService } from 'src/appCore/messages/application/messages.service';
// import {
//     NegotiationDto,
//     UpdateNegotiationDto,
// } from '../domain/negotiation.dtos';
// import { NegotiationEntity } from '../domain/negotiation.entity';
// import AblyAdapter from 'src/modules/shared/src/infrastructure/adapters/ably.adapter';
// import GetPrivateUserChannelByUserIdUseCase from 'src/modules/shared/src/application/useCases/get.private.user.channel.by.user.id.use.case';
// import FindOneUserByIdService from 'src/modules/user/src/domain/services/find.one.user.by.id.service';
// import FindCompanyByOwnerIdService from 'src/modules/company/src/domain/services/find.user.company.by.user.id.service';

// @Injectable()
// export class NegotiationsService extends PrismaGenericService<
//     NegotiationEntity,
//     Prisma.NegotiationCreateArgs,
//     Prisma.NegotiationFindUniqueArgs,
//     Prisma.NegotiationUpdateArgs,
//     Prisma.NegotiationDeleteArgs,
//     Prisma.NegotiationFindManyArgs
// > {
//     private readonly logger = new Logger(NegotiationsService.name);
//     constructor(
//         private readonly prismaService: PrismaService,
//         // private readonly ablyService: AblyService,
//         private readonly messagesService: MassagesService,
//         @Inject(AblyAdapter)
//         private readonly ablyAdapter: AblyAdapter,
//         private readonly getPrivateUserChannelByUserIdUseCase: GetPrivateUserChannelByUserIdUseCase,
//         private readonly findOneUserByIdService: FindOneUserByIdService,
//         private readonly findCompanyByOwnerIdService: FindCompanyByOwnerIdService,
//     ) {
//         super(prismaService.negotiation);
//     }
//     select: Prisma.NegotiationSelect = {
//         // driver: driverNegotion,
//     };

//     selectSend: Prisma.NegotiationSelect = {
//         id: true,
//         userId: true,
//         driverId: true,
//         orderId: true,
//         offerCarrier: true,
//         counterOfferShipper: true,
//         order: true,
//         // user: {
//         //     select: {
//         //         ablyChannel: {
//         //             select: {
//         //                 channelName: true,
//         //             },
//         //         },
//         //     },
//         // },
//         // driver: {
//         //     select: {
//         //         ablyChannel: {
//         //             select: {
//         //                 channelName: true,
//         //             },
//         //         },
//         //     },
//         // },
//     };

//     async updateSend(
//         updateNegotiationDto: UpdateNegotiationDto,
//         orderId: string,
//         userId: string,
//         // logType: $Enums.RolesEnum,
//         // companyId: number
//     ) {

//         const where: Prisma.NegotiationWhereUniqueInput = { id: +orderId };

//         // let descriptionMessage: DescriptionMessageEnum;

//         // if (logType === $Enums.RolesEnum.COMPANY) {

//         //     if (updateNegotiationDto.counterOfferShipper)
//         //         throw new UnauthorizedException(
//         //             'You are not authorized to perform this action.'
//         //         );

//         //     updateNegotiationDto['lastNegotiaton'] = $Enums.LastNegotiatonEnums.CARRIER;

//         where['driverId'] = userId;

//         //     descriptionMessage = DescriptionMessageEnum.SHIPPER_OFERT;

//         // } else if (logType === $Enums.RolesEnum.SHIPPER) {

//         //     if (updateNegotiationDto.offerCarrier)
//         //         throw new UnauthorizedException(
//         //             'You are not authorized to perform this action.'
//         //         );

//         //     updateNegotiationDto['lastNegotiaton'] = $Enums.LastNegotiatonEnums.SHIEPER;

//         //     where['userId'] = userId;

//         //     descriptionMessage = DescriptionMessageEnum.CARRIER_OFERT;

//         // }

//         const data = await this.update(
//             this.filter(orderId),
//             {
//                 data: updateNegotiationDto,
//                 where: where,
//                 select: this.selectSend,
//             }
//         );

//         const privateUserChannel = logType === 'COMPANY'
//             ?
//             await this.getPrivateUserChannelByUserIdUseCase.execute({ userId: data.userId.toString() })
//             :
//             await this.getPrivateUserChannelByUserIdUseCase.execute({ userId: data.driverId.toString() })
//             ;

//         const user = logType === 'COMPANY'
//             ?
//             await this.findOneUserByIdService.find({ id: data.userId.toString() })
//             :
//             await this.findOneUserByIdService.find({ id: data.driverId.toString() })
//             ;

//         const company = logType === 'COMPANY'
//             ?
//             await this.findCompanyByOwnerIdService.find(userId.toString())
//             :
//             undefined;

//         await this.ablyAdapter.publishMessage(
//             privateUserChannel.content.channels[0].name,
//             {
//                 user: {
//                     id: user.id,
//                     fisrtName: user.firstName,
//                     lastName: user.lastName,
//                     email: user.email,
//                     phoneNumber: user.phone,
//                 },
//                 company: company ? {
//                     id: company?.id,
//                     name: company?.companyName
//                 } : undefined,
//                 order: {
//                     id: data.orderId,
//                 },
//                 offer: logType === 'COMPANY' ? data.offerCarrier : data.counterOfferShipper,
//             },
//             'BID'
//         );

//         // const channelName =
//         //   logType === $Enums.RolesEnum.COMPANY
//         //     ? data.userId
//         //     : data.driverId;

//         // const createMessage: Prisma.MessageCreateArgs = {
//         //   data: {
//         //     companyId: companyId,
//         //     ownerId: channelName,
//         //     negotiationId: data.id,
//         //     description: descriptionMessage,
//         //     userId: channelName,
//         //   },
//         // };

//         //await this.messagesService.create(createMessage);

//         // await this.ablyService.sendMessage(
//         //   channelName,
//         //   {
//         //     negatationId: data.id,
//         //     status: AblyStatus.Negotiation,
//         //     action: AblyAction.Message,
//         //     description: descriptionMessage,
//         //   }
//         // );

//         return data;

//     };
// }
