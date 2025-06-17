// import { Injectable, Logger } from "@nestjs/common";
// import AblyAdapter from "src/modules/shared/src/infrastructure/adapters/ably.adapter";
// import NegotiationReadRepository from "../../infrastructure/repositories/negotiation.read.repository";
// import NegotiationWriteRepository from "../../infrastructure/repositories/negotiation.write.repository";
// import OpenBusinessUseCase from "./open.business.use.case";

// @Injectable()
// export default class BiddingUseCase {

//     private readonly logger = new Logger(BiddingUseCase.name);

//     public constructor(
//         private readonly negotiationReadRepository: NegotiationReadRepository,
//         private readonly negotiationWriteRepository: NegotiationWriteRepository,
//         private readonly openBusinessUseCase: OpenBusinessUseCase,
//         private readonly ablyAdapter: AblyAdapter,
//     ) { };

//     public async execute(
//         params: {
//             offer: {
//                 type: string,
//                 details: Record<string, unknown>,
//             },
//             from: string,
//             to: string,
//             businessObjectId: string,
//         },
//     ) {

//         const {
//             offer,
//             from,
//             to,
//             businessObjectId,
//         } = params;

//         let findBusiness: {
//             id: string,
//             status: string,
//             stakeholders: {
//                 id: string;
//                 businessId: string;
//                 type: string;
//                 details: Record<string, unknown>;
//                 role: string;
//                 stakeholderId: string;
//             }[];
//             objects: {
//                 id: string;
//                 businessId: string;
//                 type: string;
//                 details: Record<string, unknown>;
//                 objectId: string;
//             }[];
//             offers: {
//                 id: string;
//                 status: string;
//                 bidderId: string;
//                 businessId: string;
//                 type: string;
//                 details: Record<string, unknown>;
//                 offerAt: Date;
//             }[],
//         };

//         try {

//             findBusiness = await this.negotiationReadRepository.findBusinessByStakeholderIdAndObjectId(
//                 {
//                     stakeholderIds: [from, to],
//                     objectIds: [businessObjectId]
//                 }
//             );

//             if (findBusiness == null) {

//                 findBusiness = await this.openBusinessUseCase.execute(
//                     {
//                         objects: [{ id: businessObjectId, type: "service.carrier", name: "order" }],
//                         stakeholders: [{ id: from, type: "person", role: "carrier" }, { id: to, type: "person", role: "shipper" }]
//                     }
//                 );

//             };

//             await this.negotiationWriteRepository.saveBusinessOffer(
//                 {
//                     bidderId: from,
//                     businessId: findBusiness.id,
//                     offer: offer,
//                 }
//             );

//             const { stakeholders } = findBusiness;

//             stakeholders.map(
//                 s => {
//                     if (s.stakeholderId !== from) {

//                         this.ablyAdapter.publishMessage

//                     };
//                 }
//             );

//         } catch (error) {

//             this.logger.error(
//                 {
//                     source: `${BiddingUseCase.name}`,
//                     message: `err bidding: ${error.message}`,
//                 }
//             );

//         };

//     };

// };