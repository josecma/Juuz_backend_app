// import { Inject, Injectable, Logger } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { PrismaClient } from "@prisma/client";
// import CreateUserCredentialAdapter from "../adapters/create.user.credential.adapter";
// import CreateIdentityAdapter from "../adapters/create.user.identity.adapter";

// @Injectable({})
// export default class AdminSeed {

//     private readonly logger = new Logger('AdminSeed');

//     public constructor(
//         @Inject(PrismaClient)
//         private readonly client: PrismaClient,
//         @Inject(CreateUserCredentialAdapter)
//         private readonly createUserCredentialAdapter: CreateUserCredentialAdapter,
//         @Inject(CreateIdentityAdapter)
//         private readonly createIdentityAdapter: CreateIdentityAdapter,
//         @Inject(ConfigService)
//         private readonly configService: ConfigService,
//     ) { };

//     public async up() {

//         try {

//             const user = await this.client.user.create(
//                 {
//                     data: {
//                         firstName: 'admin',
//                         lastName: 'admin',
//                     }
//                 }
//             );

//             await this.createIdentityAdapter.create(
//                 {
//                     type: 'email',
//                     value: this.configService.get<string>('ADMIN_EMAIL'),
//                 }
//             );

//             await this.createUserCredentialAdapter.create(
//                 {
//                     userId: user.id,
//                     password: this.configService.get<string>('ADMIN_PASSWORD'),
//                 }
//             );

//         } catch (error) {

//             this.logger.error(error);

//         };

//     };

// };