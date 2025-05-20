// import { ConflictException, Inject, Injectable } from "@nestjs/common";
// import IdentityReadRepository from "../../infrastructure/repositories/identity.read.repository";
// import IdentityWriteRepository from "../../infrastructure/repositories/identity.write.repository";

// @Injectable({})
// export default class CreateIdentityService {

//     public constructor(
//         @Inject(IdentityWriteRepository)
//         private readonly identityWriteRepository: IdentityWriteRepository,
//         @Inject(IdentityReadRepository)
//         private readonly identityReadRepository: IdentityReadRepository,
//     ) { };

//     public async create(
//         params: {
//             type: string;
//             value: string;
//         },
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

//             if (identity) {
//                 throw new ConflictException(
//                     {
//                         source: `${CreateIdentityService.name}`,
//                         message: 'identity already exists',
//                     }
//                 );
//             };

//             const createdIdentity = await this.identityWriteRepository.save(
//                 {
//                     type,
//                     value,
//                 }
//             );

//             return createdIdentity;

//         } catch (error) {

//             throw error;

//         };

//     };

// };