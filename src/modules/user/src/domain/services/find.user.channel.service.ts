// import { Inject, Injectable } from "@nestjs/common";
// import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
// import UserRepository from "../../infrastructure/user.repository";
// import FindOneUserByIdService from "./find.one.user.by.id.service";

// @Injectable({})
// export default class FindUserChannelService {

//     public constructor(
//         @Inject(FindOneUserByIdService)
//         private readonly findOneUserByIdService: FindOneUserByIdService,
//         @Inject(UserRepository)
//         private readonly userRepository: UserRepository,
//     ) { };

//     public async find(
//         params: {
//             userId: string;
//             channelName: string;
//         }
//     ): Promise<string> {

//         const { userId, channelName } = params;

//         try {

//             if (!userId) {

//                 throw new BadRequestDomainException(
//                     {
//                         source: `${FindOneUserByIdService.name}`,
//                         message: "user id is required",
//                     }
//                 );

//             };

//             const user = await this.findOneUserByIdService.find(
//                 {
//                     id: userId,
//                 }
//             );

//             if (!user.userChannel) {
//                 const channel = await this.userRepository.assignChannel(
//                     {
//                         id: userId,
//                         channelName,
//                     }
//                 );
//                 return channel.name;
//             };

//             return user.userChannel.channel.name;

//         } catch (error) {
//             throw error;
//         };

//     };

// };