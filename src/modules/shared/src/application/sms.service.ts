// import { Inject, Injectable } from "@nestjs/common";
// import SMSServiceProvider from "src/modules/shared/src/infrastructure/providers/notifications/sns.provider.";

// @Injectable()
// export default class SMSService {

//     public constructor(
//         @Inject(FindUserService)
//         private readonly findUserService: FindOne,
//         @Inject(SMSServiceProvider)
//         private readonly smsServiceProvider: SMSServiceProvider,
//     ) { };

//     public async execute(params: { ids: number[]; }) {

//         const { ids } = params;

//         try {

//             const users = await this.findUserService.execute({ ids });

//             const phoneNumbers = users.map((obj) => obj.phone);

//             await Promise.all(phoneNumbers.map(async (phoneNumber) => {
//                 await this.smsServiceProvider.send({
//                     to: phoneNumber,
//                     message: "hola ferreiro desde juuz"
//                 })
//             }));

//         } catch (error) {

//             console.error(error);
//             throw new Error(error);

//         };

//     };

// };