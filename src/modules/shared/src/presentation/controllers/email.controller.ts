// import { Body, Controller, HttpCode, Inject, Post, Res } from "@nestjs/common";
// import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
// import EmailService from "../../application/email.service";
// import NumericStringListDto from "../dtos/numeric.string.list.dto";
// import NumericStringListPipeTransform from "../pipes/numeric.string.list.pipe";
// import { Response } from "express";

// @ApiTags('email')
// @Controller({
//     path: "email"
// })
// export default class EmailController {

//     public constructor(
//         @Inject()
//         private readonly emailService: EmailService,
//     ) { };

//     @ApiOperation({
//         summary: 'send email',
//         description: 'sends emails to each valid email associated with the user id',
//     })
//     @ApiBody({ type: NumericStringListDto, description: 'Request body with the list of user ids' })
//     @HttpCode(200)
//     @Post('/send')
//     public async send(@Body(new NumericStringListPipeTransform()) ids: number[]) {

//         try {

//             await this.emailService.execute({ ids: ids });

//         } catch (error) {

//             console.error(error);
//             throw new Error(error);

//         };

//     };

// };