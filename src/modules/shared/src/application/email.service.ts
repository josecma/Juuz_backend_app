// import { Inject, Injectable } from "@nestjs/common";
// import FindUserService from "src/appCore/users/application/find.user.service";
// import NodeMailerProvider from "../infrastructure/providers/emails/nodemailer.provider";
// import * as hbs from 'handlebars';
// import * as fs from 'fs';
// import * as path from 'path';

// @Injectable()
// export default class EmailService {

//     public constructor(
//         @Inject(FindUserService)
//         private readonly findUserService: FindUserService,
//         @Inject(NodeMailerProvider)
//         private readonly nodeMailerProvider: NodeMailerProvider,
//     ) { };

//     public async execute(params: { ids: number[]; }) {

//         const { ids } = params;

//         try {

//             const users = await this.findUserService.execute({ ids });

//             const emails = users.map((obj) => obj.email);

//             await this.nodeMailerProvider.send({
//                 to: emails,
//                 subject: "hello from juuz",
//                 text: `hello`,
//             });

//         } catch (error) {

//             console.error(error);
//             throw new Error(error);

//         };

//     };

//     // private buildTemplate() {

//     //     const templatePath = path.join(__dirname, 'views', 'otp-template.hbs');
//     //     const templateSource = fs.readFileSync(templatePath, 'utf-8');
//     //     const compiledTemplate = hbs.compile(templateSource);

//     //     const html = compiledTemplate({ name, otp, url });

//     //     return html;

//     // };

// };