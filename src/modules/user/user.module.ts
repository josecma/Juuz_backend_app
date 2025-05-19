import { forwardRef, Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import PerformanceModule from "../performance/performance.module";
import SharedModule from "../shared/shared.module";
import FindUserLocationUseCase from "./src/application/useCases/find.user.location.use.case";
import ToggleAndReturnUserLocationUseCase from "./src/application/useCases/toggle.and.return.user.location.use.case";
import UpdateAndReturnUserUseCase from "./src/application/useCases/update.and.return.user.use.case";
import FindOneUserByIdService from "./src/domain/services/find.one.user.by.id.service";
import DoesUserExistRepository from "./src/infrastructure/repositories/does.user.exist.repository";
import UserCompanyRepository from "./src/infrastructure/repositories/user.company.repository";
import UserRepository from "./src/infrastructure/repositories/user.repository";
import UserVehicleRepository from "./src/infrastructure/repositories/user.vehicle.repository";
import GetUserDetailUseCase from "./src/application/useCases/get.user.detail.use.case";
import OrderModule from "../order/order.module";
import InviteUserToMyCompanyUseCase from "./src/application/useCases/join.company.request.by.email.use.case";
import FindCompanyByOwnerIdAdapter from "./src/infrastructure/adapters/find.company.by.owner.id.adapter";
import JoinCompanyRequestWriteRepository from "./src/infrastructure/repositories/join.company.request.write.repository";
import RequestAdapter from "./src/infrastructure/adapters/request.adapter";
import CreateUserIdentityService from "./src/domain/services/create.user.identity.service";
import UserIdentityVerificationWriteRepository from "./src/infrastructure/repositories/user.iv.write.repository";
import KeyWriteRepository from "./src/infrastructure/repositories/key.write.repository";
import SourceWriteRepository from "./src/infrastructure/repositories/source.write.repository";
import HotpAdapter from "../shared/src/infrastructure/adapters/hotp.adapter";
import GetUserOtpSecretService from "./src/domain/services/get.user.otp.secret.service";
import GetUserHotpCounterService from "./src/domain/services/get.user.hotp.counter.service";
import { OtpSecretAdapter } from "../shared/src/infrastructure/adapters/otp.secret.adapter";
import CompanyModule from "../company/company.module";
import UserIdentityReadRepository from "./src/infrastructure/repositories/user.identity.read.repository";
import UserIdentityWriteRepository from "./src/infrastructure/repositories/user.identity.write.repository";
import UserOtpSecretReadRepository from "./src/infrastructure/repositories/user.otp.secret.read.repository";
import UserOtpSecretWriteRepository from "./src/infrastructure/repositories/user.otp.secret.write.repository";
import UserHotpCounterReadRepository from "./src/infrastructure/repositories/user.hotp.counter.read.repository";
import UserHotpCounterWriteRepository from "./src/infrastructure/repositories/user.hotp.counter.write.repository";

@Module({
        imports: [
                DatabaseModule,
                forwardRef(() => SharedModule),
                forwardRef(() => PerformanceModule),
                forwardRef(() => OrderModule),
                forwardRef(() => CompanyModule),
        ],
        controllers: [],
        providers: [
                UserRepository,
                JoinCompanyRequestWriteRepository,
                SourceWriteRepository,
                KeyWriteRepository,
                UserIdentityVerificationWriteRepository,
                FindOneUserByIdService,
                FindUserLocationUseCase,
                UpdateAndReturnUserUseCase,
                ToggleAndReturnUserLocationUseCase,
                DoesUserExistRepository,
                UserCompanyRepository,
                UserVehicleRepository,
                GetUserDetailUseCase,
                InviteUserToMyCompanyUseCase,
                FindCompanyByOwnerIdAdapter,
                RequestAdapter,
                CreateUserIdentityService,
                HotpAdapter,
                GetUserOtpSecretService,
                GetUserHotpCounterService,
                OtpSecretAdapter,
                UserIdentityReadRepository,
                UserIdentityWriteRepository,
                UserOtpSecretReadRepository,
                UserOtpSecretWriteRepository,
                UserHotpCounterReadRepository,
                UserHotpCounterWriteRepository,
        ],
        exports: [
                UserRepository,
                FindOneUserByIdService,
                FindUserLocationUseCase,
                ToggleAndReturnUserLocationUseCase,
                UpdateAndReturnUserUseCase,
                DoesUserExistRepository,
                GetUserDetailUseCase,
                InviteUserToMyCompanyUseCase,
        ],
})
export default class UserModule { };

