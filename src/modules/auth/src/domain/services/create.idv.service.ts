// import { Inject, Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
// import TotpAdapter from "../../infrastructure/adapters/totp.adapter";
// import IdentityReadRepository from "../../infrastructure/repositories/identity.read.repository";
// import IdvWriteRepository from "../../infrastructure/repositories/idv.write.repository";

// @Injectable({})
// export default class CreateIdvService {

//     public constructor(
//         @Inject(IdentityReadRepository)
//         private readonly identityReadRepository: IdentityReadRepository,
//         @Inject(TotpAdapter)
//         private readonly totpAdapter: TotpAdapter,
//         @Inject(ConfigService)
//         private readonly configService: ConfigService,
//         @Inject(IdvWriteRepository)
//         private readonly idvWriteRepository: IdvWriteRepository,
//     ) { };

//     public async create(
//         params: {
//             type: string;
//             value: string;
//         }
//     ) {

//         const {
//             type,
//             value,
//         } = params;

//         try {

//             const identity = await this.identityReadRepository.findOneBy(
//                 {
//                     type,
//                     value,
//                 }
//             );

//             if (!identity) {
//                 throw new NotFoundDomainException(
//                     {
//                         source: `${CreateIdvService.name}`,
//                         message: `identity not found`,
//                     }
//                 );
//             };

//             const newKey = this.totpAdapter.generateToken({ secret: this.configService.get('SECRET') });

//             const savedIdv = await this.idvWriteRepository.save(
//                 {
//                     identityId: identity.id,
//                     key: newKey,
//                 }
//             );

//             return savedIdv;

//         } catch (error) {

//             throw error;

//         };

//     };

// };