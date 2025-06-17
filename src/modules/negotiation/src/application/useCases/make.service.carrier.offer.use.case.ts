// import { Injectable, Logger } from "@nestjs/common";
// import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
// import { OfferTypeEnum } from "../../domain/enums/offer.type.enum";
// import OpenBusinessService from "../../domain/services/open.business.service";
// import NegotiationReadRepository from "../../infrastructure/repositories/negotiation.read.repository";
// import NegotiationWriteRepository from "../../infrastructure/repositories/negotiation.write.repository";

// @Injectable()
// export default class MakeServiceCarrierOfferUseCase {

//     private readonly logger = new Logger(MakeServiceCarrierOfferUseCase.name);

//     public constructor(
//         private readonly openBusinessService: OpenBusinessService,
//         private readonly negotiationWriteRepository: NegotiationWriteRepository,
//         private readonly negotiationReadRepository: NegotiationReadRepository,
//     ) { };

//     public async execute(
//         params: {
//             offer: {
//                 type: OfferTypeEnum.MONETARY,
//                 details: {
//                     amount: number,
//                     currency: string,
//                 },
//             },
//             from: {
//                 type: string,
//                 id: string,
//                 details: {
//                     userId: string,
//                 }
//             },
//             to: {
//                 type: string,
//                 id: string,
//             },
//             orderId: string,
//         },
//     ) {

//         const {
//             offer,
//             from,
//             to,
//             orderId,
//         } = params;

//         try {

//             const findOneOrderByIdResponse = await this.orderReadRepository.findOneById(orderId);

//             if (findOneOrderByIdResponse == null) {

//                 throw new NotFoundDomainException(
//                     {
//                         message: "order not found",
//                     }
//                 );

//             } else {

//                 const { } = findOneOrderByIdResponse;

//             };

//             const business = await this.openBusinessService.open(
//                 {
//                     objects: [
//                         {
//                             id: orderId,
//                             type: 'service.carrier',
//                             details: {
//                                 name: "order"
//                             }
//                         }
//                     ],
//                     stakeholders: [
//                         {
//                             id: from.companyId,
//                             type: 'company',
//                             role: 'carrier',
//                             details: {
//                                 userId: from.userId
//                             },
//                         },
//                         {
//                             id: to,
//                             type: 'person',
//                             role: 'shipper',
//                             details: {}
//                         }
//                     ]
//                 }
//             );

//             const saveBusinessOfferResponse = await this.negotiationWriteRepository.saveBusinessOffer(
//                 {
//                     bidderId: from.companyId,
//                     businessId: business.id,
//                     offer: {
//                         ...offer,
//                         status: 'pending'
//                     },
//                 }
//             );

//             const businessStakeholders = await this.negotiationReadRepository.findBusinessStakeholders(business.id);

//         } catch (error) {

//             this.logger.error(
//                 {
//                     source: `${MakeServiceCarrierOfferUseCase.name}`,
//                     message: `err making service carrier offer: ${error.message}`,
//                 }
//             );

//         };

//     };

// };