// import { Inject, Injectable, NotFoundException } from "@nestjs/common";
// import EvidenceRepository from "../../infrastructure/evidence.repository";
// import EvidenceRepositoryContract from "../contracts/repositories/evidence.repository.contract";

// @Injectable({})
// export default class FindEvidenceByService {

//     public constructor(
//         @Inject(EvidenceRepository)
//         private readonly evidenceRepository: EvidenceRepositoryContract,
//     ) { };

//     public async find(
//         params: {
//             pagination?: {
//                 page: number;
//                 limit: number;
//             };
//             findByObj: {
//                 userId?: string;
//                 status?: boolean;
//                 orderId?: string;
//                 type?: string;
//                 keys?: string[];
//             };
//         }
//     ) {

//         const { pagination, findByObj } = params;

//         try {

//             const evidences = await this.evidenceRepository.findBy(
//                 {
//                     pagination,
//                     findByObj: {
//                         userId,
//                         orderId,
//                     }
//                 }
//             );

//             return evidences;

//         } catch (error) {

//             throw error;

//         };

//     };

// };