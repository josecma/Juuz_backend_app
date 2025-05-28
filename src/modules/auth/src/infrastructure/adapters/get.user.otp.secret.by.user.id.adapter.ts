// import { Inject, Injectable } from "@nestjs/common";
// import GetUserOtpSecretService from "src/modules/user/src/domain/services/get.user.otp.secret.service";

// @Injectable()
// export default class GetUserOtpSecretByUserIdAdapter {

//     public constructor(
//         @Inject(GetUserOtpSecretService)
//         private readonly getUserOtpSecretService: GetUserOtpSecretService,
//     ) { };

//     public async find(
//         userId: string
//     ) {

//         try {

//             const userOtpSecret = await this.getUserOtpSecretService.get(userId);

//             return userOtpSecret;

//         } catch (error) {

//             throw error;

//         };

//     };

// };