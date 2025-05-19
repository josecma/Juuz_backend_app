// import { Inject, Injectable } from "@nestjs/common";
// import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
// import FindOneUserByIdService from "src/modules/user/src/domain/services/find.one.user.by.id.service";
// import NegotiationRepository from "../../infrastructure/negotiation.repository";

// @Injectable({})
// export default class CreateBusinessService {

//     public constructor(
//         @Inject(NegotiationRepository)
//         private readonly negotiationRepository: NegotiationRepository,
//         @Inject(FindOneUserByIdService)
//         private readonly findOneUserByIdService: FindOneUserByIdService,
//     ) { };

//     public async create(
//         params: {
//             channelName: string;
//             stakeholders: Array<string>;
//         },
//     ) {

//         const { channelName, stakeholders } = params;

//         try {

//             if (!(channelName)) {
//                 throw new BadRequestDomainException(
//                     {
//                         message: "channel name is required",
//                         source: `${CreateBusinessService.name}`
//                     }
//                 );
//             };

//             if (!(stakeholders.length > 1)) {
//                 throw new BadRequestDomainException(
//                     {
//                         message: "stakeholders must be at least 2",
//                         source: `${CreateBusinessService.name}`
//                     }
//                 );
//             };

//             const filterStakeholders = await Promise.all(
//                 stakeholders.map(async (s) => {
//                     const user = await this.findOneUserByIdService.find(
//                         {
//                             id: s,
//                         }
//                     )
//                     return user.id.toString();
//                 })
//             );

//             return await this.negotiationRepository.createBusiness(
//                 {
//                     channelName,
//                     stakeholders: filterStakeholders,
//                 }
//             );

//         } catch (error) {

//             throw error;

//         };

//     };

// };