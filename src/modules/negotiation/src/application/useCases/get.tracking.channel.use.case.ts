import { Inject, Injectable } from "@nestjs/common";
import FindOneOrderByIdService from "src/modules/order/src/domain/services/find.one.order.by.id.service";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import BuildChannelNameService from "src/modules/shared/src/domain/services/build.channel.name.service";
import AblyAdapter from "src/modules/shared/src/infrastructure/adapters/ably.adapter";
import ChannelReadRepository from "src/modules/shared/src/infrastructure/channel.read.repository";
import ChannelWriteRepository from "src/modules/shared/src/infrastructure/channel.write.repository";

@Injectable({})
export default class GetTrackingChannelUseCase {

    public constructor(
        @Inject(FindOneOrderByIdService)
        private readonly findOneOrderByIdService: FindOneOrderByIdService,
        @Inject(ChannelReadRepository)
        private readonly channelReadRepository: ChannelReadRepository,
        @Inject(ChannelWriteRepository)
        private readonly channelWriteRepository: ChannelWriteRepository,
        @Inject(AblyAdapter)
        private readonly ablyAdapter: AblyAdapter,
    ) { };

    public async execute(
        params: {
            orderId: string;
            userId: string;
        }
    ) {

        const { orderId, userId } = params;

        try {

            const order = await this.findOneOrderByIdService.find(
                {
                    id: orderId,
                }
            );

            const { ownerId, driverId } = order;

            if (!driverId) {
                throw new Error("driver id not present");
            };

            if (!ownerId) {
                throw new Error("owner id not present");
            };

            if (order.ownerId.toString() !== userId && order.driverId.toString() !== userId) {

                throw new NotFoundDomainException(
                    {
                        message: `order with id:${orderId} not found`,
                    }
                );

            };

            const trackingChannelToSub = await this.channelReadRepository.findUserChannelBy(
                {
                    userId: ownerId.toString(),
                    subStr: "tracking",
                }
            );

            const trackingChannelToPub = await this.channelReadRepository.findUserChannelBy(
                {
                    userId: driverId.toString(),
                    subStr: "tracking",
                }
            );

            const userTrackingChannelWithSubPermissions = trackingChannelToSub.filter(
                (e) => e.permissions.length === 1
                    &&
                    e.permissions[0] == "subscribe"
            );

            const userTrackingChannelWithPubPermissions = trackingChannelToPub.filter(
                (e) => e.permissions.length === 1
                    &&
                    e.permissions[0] == "publish"
            );

            if (driverId.toString() == userId) {

                if (userTrackingChannelWithSubPermissions.length > 0) {

                    const userChannelWithPubPermission = userTrackingChannelWithPubPermissions.find(
                        (pub) => (
                            userTrackingChannelWithSubPermissions.find(
                                (sub) => (pub.name == sub.name)
                            )
                        )
                    );

                    if (!userChannelWithPubPermission) {

                        await this.channelWriteRepository.save(
                            {
                                userId,
                                name: userTrackingChannelWithSubPermissions[0].name,
                                permissions: ["publish"],
                                items: [{ type: "ORDER", id: orderId }],
                            }
                        );

                    } else {


                        const items = userChannelWithPubPermission.items;

                        const orderExists = items.some(
                            item => item.type === "ORDER" && item.id === orderId
                        );

                        await this.channelWriteRepository.save(
                            {
                                userId,
                                name: userTrackingChannelWithSubPermissions[0].name,
                                permissions: ["publish"],
                                items:
                                    orderExists
                                        ? [...items]
                                        : [{ type: "ORDER", id: orderId }, ...items]
                            }
                        );
                    };

                } else if (userTrackingChannelWithPubPermissions.length == 0) {

                    const newChannelName = BuildChannelNameService.tracking().uuid().getBuiltChannelName();

                    await this.channelWriteRepository.save(
                        {
                            userId,
                            name: newChannelName,
                            permissions: ["publish"],
                            items: [{ type: "ORDER", id: orderId }],
                        }
                    );

                };

            };

            if (ownerId.toString() == userId) {

                if (order.status === "ASSIGNED" && order.subStatus === "ASSIGNED") {

                    throw new Error("order has not yet started");

                };

                if (userTrackingChannelWithPubPermissions.length > 0) {

                    const userChannelWithSubPermission = userTrackingChannelWithSubPermissions.find(
                        (sub) => (
                            userTrackingChannelWithPubPermissions.find(
                                (pub) => (sub.name == pub.name)
                            )
                        )
                    );

                    if (!userChannelWithSubPermission) {

                        await this.channelWriteRepository.save(
                            {
                                userId,
                                name: userTrackingChannelWithPubPermissions[0].name,
                                permissions: ["subscribe"],
                                items: [{ type: "ORDER", id: orderId }],
                            }
                        );

                    } else {

                        const items = userChannelWithSubPermission.items;

                        const orderExists = items.some(
                            item => item.type === "ORDER" && item.id === orderId
                        );

                        await this.channelWriteRepository.save(
                            {
                                userId,
                                name: userTrackingChannelWithSubPermissions[0].name,
                                permissions: ["publish"],
                                items:
                                    orderExists
                                        ? [...items]
                                        : [{ type: "ORDER", id: orderId }, ...items]
                            }
                        );
                    };

                } else if (userTrackingChannelWithSubPermissions.length == 0) {

                    const newChannelName = BuildChannelNameService.tracking().uuid().getBuiltChannelName();

                    await this.channelWriteRepository.save(
                        {
                            userId,
                            name: newChannelName,
                            permissions: ["subscribe"],
                            items: [{ type: "ORDER", id: orderId }],
                        }
                    );

                };

            };

            const userChannels = await this.channelReadRepository.findUserChannels(
                {
                    userId
                }
            );

            const channels = Object.fromEntries(
                userChannels.map(channel => [channel.name, channel.permissions])
            );

            const userTokenWithChannels = await this.ablyAdapter.createToken(
                {
                    memberId: userId,
                    channels: channels
                }
            );

            return {
                msg: "channels successfully recovered",
                content: {
                    token: userTokenWithChannels.token,
                    channels: userChannels.map((uCh) => { return { name: uCh.name, items: uCh.items } })
                },
            };

        } catch (error) {

            throw error;

        };

    };

};