// import { Inject, Injectable } from "@nestjs/common";
// import UUIDAdapter from "src/modules/shared/src/infrastructure/adapters/uuid.adapter";
// import CreateBusinessService from "../domain/services/create.business.service";

// @Injectable({})
// export default class ContactUserByIdUseCase {

//     public constructor(
//         @Inject(AblyAdapter)
//         private readonly ablyAdapter: AblyAdapter,
//         @Inject(CreateBusinessService)
//         private readonly createBusinessService: CreateBusinessService,
//         @Inject(UUIDAdapter)
//         private readonly uuidAdapter: UUIDAdapter,
//     ) { };

//     public async execute(
//         params: {
//             from: string;
//             to: string;
//         }
//     ) {

//         const { from, to } = params;

//         try {

//             const newBusiness = await this.createBusinessService.create(
//                 {
//                     channelName: this.uuidAdapter.get(),
//                     stakeholders: [from, to],
//                 }
//             );

//             const fromUserChannel = await this.FindUserChannelService.find(
//                 {
//                     userId: from,
//                     channelName: this.uuidAdapter.get(),
//                 }
//             );

//             // const toUserChannel = await this.FindUserChannelService.find(
//             //     {
//             //         userId: to,
//             //         channelName: this.uuidAdapter.get(),
//             //     }
//             // );

//             const fromUserToken = await this.ablyAdapter.createToken(
//                 {
//                     memberId: from,
//                     channels: {
//                         [newBusiness.channel.name]: ["publish", "subscribe"],
//                         [fromUserChannel]: ["subscribe"]
//                     },
//                 }
//             );

//             // const toUserToken = await this.ablyAdapter.createToken(
//             //     {
//             //         memberId: to,
//             //         channelName: newBusiness.channel.name
//             //     }
//             // );

//             //await this.ablyAdapter.publishMessage(toUserChannel, toUserToken);

//             await this.ablyAdapter.publishMessage(fromUserChannel, fromUserToken);

//         } catch (error) {

//             throw error;

//         };

//     };

// };