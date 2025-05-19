// import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
// import EvidenceRepository from "../infrastructure/evidence.repository";

// @Injectable()
// export default class FindOneEvidenceByService {

//     public constructor(
//         @Inject(EvidenceRepository)
//         private readonly evidenceRepository: EvidenceRepository,
//     ) { };

//     public async execute(params: { id: string; }) {

//         const { id } = params;

//         try {

//             const evidence = await this.evidenceRepository.findOneBy({ id });

//             if (evidence === null || evidence === undefined) {

//                 throw new NotFoundException(`evidence with id:${id} does not exists`);

//             };

//             return evidence;

//         } catch (error) {

//             if (error instanceof NotFoundException) {

//                 throw error;

//             };

//             throw new InternalServerErrorException(error);

//         };

//     };

// };