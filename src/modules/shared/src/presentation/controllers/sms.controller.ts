// import { Body, Controller, Inject, Post } from "@nestjs/common";
// import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
// import SMSService from "../../application/sms.service";
// import NumericStringListDto from "../dtos/numeric.string.list.dto";
// import NumericStringListPipeTransform from "../pipes/numeric.string.list.pipe";

// @ApiTags('sms')
// @Controller({
//     path: "sms"
// })
// export default class SMSController {

//     public constructor(
//         @Inject()
//         private readonly smsService: SMSService,
//     ) { };

//     @ApiOperation({
//         summary: 'send sms',
//         description: 'sends an sms to each phone number associated with the user id',
//     })
//     @ApiBody({ type: NumericStringListDto, description: 'Request body with the list of user ids' })
//     @Post('/send')
//     public async send(@Body(new NumericStringListPipeTransform()) ids: number[]) {

//         try {

//             await this.smsService.execute({ ids: ids });

//         } catch (error) {

//             console.error(error);
//             throw new Error(error);

//         };

//     };

// };