// import { Inject, Injectable } from "@nestjs/common";
// import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
// import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
// import CompanyReadRepository from "../../infrastructure/repositories/company.read.repository";
// import CompanyWriteRepository from "../../infrastructure/repositories/company.write.repository";
// import DoesCompanyExistRepository from "../../infrastructure/repositories/does.company.exist.repository";
// import { CompanyScore } from "../types";

// @Injectable({})
// export default class UpdateCompanyScoreService {

//     public constructor(
//         @Inject(CompanyWriteRepository)
//         private readonly companyWriteRepository: CompanyWriteRepository,
//         @Inject(CompanyReadRepository)
//         private readonly companyReadRepository: CompanyReadRepository,
//         @Inject(DoesCompanyExistRepository)
//         private readonly doesCompanyExistRepository: DoesCompanyExistRepository,
//     ) { };

//     public async update(
//         params: {
//             companyId: string;
//             score: number;
//         }
//     ) {

//         const { companyId, score } = params;

//         try {

//             if (!companyId) {
//                 throw new BadRequestDomainException(
//                     {
//                         message: "company id is required",
//                         source: `${UpdateCompanyScoreService.name}`,
//                     }
//                 );
//             };

//             if (!score) {
//                 throw new BadRequestDomainException(
//                     {
//                         message: "score is required",
//                         source: `${UpdateCompanyScoreService.name}`,
//                     }
//                 );
//             };

//             const company = await this.companyReadRepository.findOneById(
//                 companyId
//             );

//             if (!company) {
//                 throw new NotFoundDomainException(
//                     {
//                         message: `company with id:${companyId} not found`,
//                         source: `${UpdateCompanyScoreService.name}`,
//                     }
//                 );
//             };

//             const companyScore = company.score as CompanyScore;

//             let newScore: CompanyScore;

//             if (companyScore) {

//                 const lastSum = companyScore.lastAvg * companyScore.lastDiv;
//                 const currentSum = lastSum + score;
//                 const currentDiv = companyScore.lastDiv + 1;
//                 const currentAvg = currentSum / currentDiv;

//                 newScore = {
//                     lastAvg: currentAvg,
//                     lastDiv: currentDiv
//                 };

//             } else {

//                 newScore = {
//                     lastAvg: score,
//                     lastDiv: 1,
//                 };

//             };

//             const updatedCompany = await this.companyWriteRepository.update(
//                 {
//                     companyId,
//                     updateObj: {
//                         score: newScore,
//                     },
//                 }
//             );

//             return {
//                 msg: "company updated successfully",
//                 content: updatedCompany,
//             };

//         } catch (error) {

//             throw error;

//         };

//     };

// };