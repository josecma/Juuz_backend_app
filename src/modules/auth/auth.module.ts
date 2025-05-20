import { forwardRef, Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import SharedModule from "../shared/shared.module";
import UserModule from "../user/user.module";
// import GetUserOtpSecretUseCase from "./src/application/useCases/get.user.otp.secret.use.case";
import { BcryptAdapter } from "./src/infrastructure/adapters/bcrypt.adapter";
import FindUserByIdAdapter from "./src/infrastructure/adapters/find.user.by.id.adapter";
import { OtpSecretAdapter } from "./src/infrastructure/adapters/otp.secret.adapter";
import TotpAdapter from "./src/infrastructure/adapters/totp.adapter";
import InitiateOtpAuthByEmailUseCase from "./src/application/useCases/initiate.otp.auth.by.email.use.case";
import CompleteOtpAuthByEmailUseCase from "./src/application/useCases/complete.otp.auth.by.email.use.case";
// import IdentityReadRepository from "./src/infrastructure/repositories/identity.read.repository";
// import IdvReadRepository from "./src/infrastructure/repositories/idv.read.repository";
// import IdvWriteRepository from "./src/infrastructure/repositories/idv.write.repository";
// import UserOtpSecretReadRepository from "./src/infrastructure/repositories/user.otp.secret.read.repository";
// import UserOtpSecretWriteRepository from "./src/infrastructure/repositories/user.otp.secret.write.repository";
import AuthController from "./src/presentation/auth.controller";
import UserAuthProcessWriteRepository from "./src/infrastructure/repositories/user.auth.process.write.repository";
import UserAuthProcessReadRepository from "./src/infrastructure/repositories/user.auth.process.read.repository";
import AuthProcessWriteRepository from "./src/infrastructure/repositories/auth.process.write.repository";
import AuthProcessReadRepository from "./src/infrastructure/repositories/auth.process.read.repository";
import FindEmailOwnerAdapter from "./src/infrastructure/adapters/find.email.owner.adapter";
import CreateUserAdapter from "./src/infrastructure/adapters/create.user.adapter";

@Module(
    {
        imports: [
            forwardRef(() => DatabaseModule),
            forwardRef(() => SharedModule),
            forwardRef(() => UserModule),
        ],
        controllers: [
            AuthController,
        ],
        providers: [
            // IdentityWriteRepository,
            // IdentityReadRepository,
            // UserIdentityWriteRepository,
            AuthProcessWriteRepository,
            AuthProcessReadRepository,
            UserAuthProcessWriteRepository,
            UserAuthProcessReadRepository,
            // UserOtpSecretReadRepository,
            // UserOtpSecretWriteRepository,
            // UserIdentityReadRepository,
            // UserCredentialReadRepository,
            // UserCredentialWriteRepository,
            // IdvReadRepository,
            // IdvWriteRepository,
            // CreateIdentityService,
            TotpAdapter,
            // GetUserOtpSecretUseCase,
            InitiateOtpAuthByEmailUseCase,
            // InitiateEmailIdvUseCase,
            // CompleteEmailIdvUseCase,
            CompleteOtpAuthByEmailUseCase,
            // CreateUserCredentialUseCase,
            // CreateUserIdentityUseCase,
            // FindUserIdentityUseCase,
            OtpSecretAdapter,
            BcryptAdapter,
            FindUserByIdAdapter,
            FindEmailOwnerAdapter,
            CreateUserAdapter,
        ],
        exports: [
            // CreateIdentityService,
            // CreateUserCredentialUseCase,
            // CreateUserIdentityUseCase,
            // InitiateEmailIdvUseCase,
            // CompleteEmailIdvUseCase,
            // FindUserIdentityUseCase,
            // UserIdentityReadRepository,
        ]
    }
)
export default class AuthModule { };