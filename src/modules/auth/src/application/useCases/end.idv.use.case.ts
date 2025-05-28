// import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
// import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
// import IdentityReadRepository from "../../infrastructure/repositories/identity.read.repository";
// import IdentityWriteRepository from "../../infrastructure/repositories/identity.write.repository";
// import IdvReadRepository from "../../infrastructure/repositories/idv.read.repository";
// import IdvWriteRepository from "../../infrastructure/repositories/idv.write.repository";

// @Injectable({})
// export default class EndIdvUseCase {

//     public constructor(
//         @Inject(IdvWriteRepository)
//         private readonly idvWriteRepository: IdvWriteRepository,
//         @Inject(IdvReadRepository)
//         private readonly idvReadRepository: IdvReadRepository,
//         @Inject(IdentityReadRepository)
//         private readonly identityReadRepository: IdentityReadRepository,
//         @Inject(IdentityWriteRepository)
//         private readonly identityWriteRepository: IdentityWriteRepository,
//     ) { };

//     public async execute(
//         params: {
//             userId: string;
//             identity: {
//                 type: string;
//                 value: string;
//             };
//             key: string;
//         },
//     ) {

//         const {
//             userId,
//             identity,
//             key,
//         } = params;

//         const {
//             type,
//             value,
//         } = identity;

//         try {

//             const identityToVerify = await this.identityReadRepository.findOneBy(
//                 {
//                     type,
//                     value,
//                 }
//             );

//             if (!identityToVerify) {

//                 throw new NotFoundDomainException(
//                     {
//                         source: `${EndIdvUseCase.name}`,
//                         message: `identity not found`,
//                     }
//                 );

//             };

//             const idvPending = await this.idvReadRepository.findPending(
//                 identityToVerify.id
//             );

//             const findIdv = idvPending.find(
//                 (idv) => idv.identityId === identityToVerify.id
//             );

//             if (key !== findIdv.key) {
//                 throw new UnauthorizedException(
//                     {
//                         source: `${EndIdvUseCase.name}`,
//                         message: 'key not valid',
//                     }
//                 );
//             };

//             await this.idvWriteRepository.update(
//                 {
//                     id: findIdv.id,
//                     updateObject: {
//                         status: "VERIFIED"
//                     },
//                 }
//             );

//             await this.identityWriteRepository.update(
//                 {
//                     id: findIdv.id,
//                     updateObject: {
//                         verified: true,
//                     },
//                 }
//             );

//         } catch (error) {

//             throw error;

//         };

//     };

// };