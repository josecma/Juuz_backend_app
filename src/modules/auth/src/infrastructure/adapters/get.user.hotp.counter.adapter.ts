// import { Inject, Injectable } from "@nestjs/common";
// import GetUserHotpCounterService from "src/modules/user/src/domain/services/get.user.hotp.counter.service";

// @Injectable()
// export default class GetUserHotpCounterAdapter {

//     public constructor(
//         @Inject(GetUserHotpCounterService)
//         private readonly getUserHotpCounterService: GetUserHotpCounterService,
//     ) { };

//     public async find(
//         userId: string
//     ) {

//         try {

//             const hotpCounter = await this.getUserHotpCounterService.get(userId);

//             return hotpCounter;

//         } catch (error) {

//             throw error;

//         };

//     };

// };