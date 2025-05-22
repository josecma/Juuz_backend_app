import { createKeyv, Keyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { forwardRef, Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import SharedModule from "../shared/shared.module";
import UserModule from "../user/user.module";
import CompleteOtpAuthByEmailUseCase from "./src/application/useCases/complete.otp.auth.by.email.use.case";
import InitiateOtpAuthByEmailUseCase from "./src/application/useCases/initiate.otp.auth.by.email.use.case";
import { BcryptAdapter } from "./src/infrastructure/adapters/bcrypt.adapter";
import CreateUserAdapter from "./src/infrastructure/adapters/create.user.adapter";
import FindEmailOwnerAdapter from "./src/infrastructure/adapters/find.email.owner.adapter";
import FindUserByIdAdapter from "./src/infrastructure/adapters/find.user.by.id.adapter";
import { OtpSecretAdapter } from "./src/infrastructure/adapters/otp.secret.adapter";
import TotpAdapter from "./src/infrastructure/adapters/totp.adapter";
import AuthProcessReadRepository from "./src/infrastructure/repositories/auth.process.read.repository";
import AuthProcessWriteRepository from "./src/infrastructure/repositories/auth.process.write.repository";
import OtpSecretCacheRepository from './src/infrastructure/repositories/otp.secret.cache.repository';
import UserAuthProcessReadRepository from "./src/infrastructure/repositories/user.auth.process.read.repository";
import UserAuthProcessWriteRepository from "./src/infrastructure/repositories/user.auth.process.write.repository";
import AuthController from "./src/presentation/auth.controller";

@Module(
    {
        imports: [
            forwardRef(() => DatabaseModule),
            forwardRef(() => SharedModule),
            forwardRef(() => UserModule),
            CacheModule.registerAsync({
                isGlobal: false,
                useFactory: async () => {
                    return {
                        stores: [
                            createKeyv(
                                {
                                    socket: {
                                        host: 'localhost',
                                        port: 6379
                                    }
                                }
                            ),
                        ],
                    };
                },
            }),
        ],
        controllers: [
            AuthController,
        ],
        providers: [
            AuthProcessWriteRepository,
            AuthProcessReadRepository,
            UserAuthProcessWriteRepository,
            UserAuthProcessReadRepository,
            OtpSecretCacheRepository,
            TotpAdapter,
            InitiateOtpAuthByEmailUseCase,
            CompleteOtpAuthByEmailUseCase,
            OtpSecretAdapter,
            BcryptAdapter,
            FindUserByIdAdapter,
            FindEmailOwnerAdapter,
            CreateUserAdapter,
        ],
        exports: [
        ]
    }
)
export default class AuthModule { };