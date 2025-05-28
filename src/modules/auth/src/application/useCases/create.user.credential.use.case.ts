// import { Inject, Injectable } from "@nestjs/common";
// import { BcryptAdapter } from "../../infrastructure/adapters/bcrypt.adapter";
// import UserCredentialReadRepository from "../../infrastructure/repositories/user.credential.read.repository";
// import UserCredentialWriteRepository from "../../infrastructure/repositories/user.credential.write.repository";

// @Injectable({})
// export default class CreateUserCredentialUseCase {

//     public constructor(
//         @Inject(UserCredentialWriteRepository)
//         private readonly userCredentialWriteRepository: UserCredentialWriteRepository,
//         @Inject(UserCredentialReadRepository)
//         private readonly userCredentialReadRepository: UserCredentialReadRepository,
//         @Inject(BcryptAdapter)
//         private readonly bcryptAdapter: BcryptAdapter,
//     ) { };

//     public async create(
//         params: {
//             userId: string;
//             password: string;
//         },
//     ) {

//         const {
//             password,
//             userId,
//         } = params;

//         try {

//             const userCredential = await this.userCredentialReadRepository.findOneBy(
//                 userId
//             );

//             if (!userCredential) {

//                 const hashingPassword = await this.bcryptAdapter.hash(password);

//                 await this.userCredentialWriteRepository.save(
//                     {
//                         userId,
//                         password: hashingPassword,
//                     }
//                 );

//                 return {
//                     msg: 'credential saved successfully',
//                 };
//             };

//         } catch (error) {

//             throw error;

//         };

//     };

// };