// import { BadRequestException, Inject, Injectable } from "@nestjs/common";
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

//         const {
//             companyId,
//             score
//         } = params;

//         try {

//             if (!score) {
//                 throw new BadRequestException("score is required");
//             };

//             const company = await this.companyReadRepository.findOneById(
//                 companyId
//             );

//             if (!company) {

//                 throw new BadRequestException("company not found");

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