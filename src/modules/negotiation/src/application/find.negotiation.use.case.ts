// import { Inject, Injectable } from "@nestjs/common";
// import NegotiationRepository from "../infrastructure/negotiation.repository";

// @Injectable({})
// export default class FindNegotiationUseCase {

//     public constructor(
//         @Inject(NegotiationRepository)
//         private readonly negotiationRepository: NegotiationRepository,
//     ) { };

//     public async execute(
//         params: {
//             id: string;
//         }): Promise<void> {

//         const { id } = params;

//         const requiredParams: string[] = [];

//         if (!id) requiredParams.push("id");

//         try {

//             if (requiredParams.length > 0) throw new Error(`${FindNegotiationUseCase.name}Err: params ${requiredParams.join(",")} are required.`);

//             await this.negotiationRepository.findBy({ findByObj: { orderId:} });

//         } catch (error) {

//             throw error;

//         };

//     };

// };