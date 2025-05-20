// import { Inject, Injectable } from "@nestjs/common";
// import { OtpSecretAdapter } from "../../infrastructure/adapters/otp.secret.adapter";
// import UserOtpSecretReadRepository from "../../infrastructure/repositories/user.otp.secret.read.repository";
// import UserOtpSecretWriteRepository from "../../infrastructure/repositories/user.otp.secret.write.repository";

// @Injectable()
// export default class GetUserOtpSecretUseCase {

//     public constructor(
//         @Inject(UserOtpSecretReadRepository)
//         private readonly userOtpSecretReadRepository: UserOtpSecretReadRepository,
//         @Inject(UserOtpSecretWriteRepository)
//         private readonly userOtpSecretWriteRepository: UserOtpSecretWriteRepository,
//         @Inject(OtpSecretAdapter)
//         private readonly otpSecretAdapter: OtpSecretAdapter,
//     ) { };

//     public async get(
//         userId: string,
//     ) {

//         let otpSecret: {
//             id: string;
//             userId: string;
//             secret: string;
//         } = null;

//         try {

//             otpSecret = await this.userOtpSecretReadRepository.findUserSecret(
//                 userId
//             );

//             if (!otpSecret) {

//                 const newSecret = this.otpSecretAdapter.generate();

//                 otpSecret = await this.userOtpSecretWriteRepository.save(
//                     {
//                         userId,
//                         encryptedSecret: newSecret,
//                     }
//                 );

//             };

//             return otpSecret;

//         } catch (error) {

//             throw error;

//         };

//     };

// };