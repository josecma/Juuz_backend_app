// import { Injectable, Logger } from "@nestjs/common";
// import CompanyMemberReadRepository from "../../infrastructure/repositories/company.member.read.repository";

// @Injectable()
// export default class IsCompanyMemberService {

//     private readonly logger = new Logger(IsCompanyMemberService.name);

//     public constructor(
//         private readonly companyMemberReadRepository: CompanyMemberReadRepository,
//     ) { };

//     public async is(
//         params: {
//             userId: string,
//             companyId: string,
//         }
//     ) {

//         try {

//             const company = await this.companyMemberReadRepository(
//                 ownerId
//             );

//             if (!company) {
//                 throw new NotFoundDomainException(
//                     {
//                         message: `the owner's company with id:${ownerId} not found`,
//                     }
//                 );
//             };

//         } catch (error) {

//             throw error;

//         };

//     };

// };