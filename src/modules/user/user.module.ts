import { forwardRef, Module } from "@nestjs/common";
import AuthModule from "../auth/auth.module";
import CompanyModule from "../company/company.module";
import DatabaseModule from "../database/database.module";
import OrderModule from "../order/order.module";
import PerformanceModule from "../performance/performance.module";
import SharedModule from "../shared/shared.module";
import HotpAdapter from "../shared/src/infrastructure/adapters/hotp.adapter";
import { OtpSecretAdapter } from "../shared/src/infrastructure/adapters/otp.secret.adapter";
import VehicleModule from "../vehicle/vehicle.module";
// import FindUserLocationUseCase from "./src/application/useCases/find.user.location.use.case";
// import GetUserDetailUseCase from "./src/application/useCases/get.user.detail.use.case";
// import InviteUserToMyCompanyUseCase from "./src/application/useCases/join.company.request.by.email.use.case";
// import ToggleAndReturnUserLocationUseCase from "./src/application/useCases/toggle.and.return.user.location.use.case";
// import UpdateAndReturnUserUseCase from "./src/application/useCases/update.and.return.user.use.case";
import FindOneUserByIdService from "./src/domain/services/find.one.user.by.id.service";
// import CreateUserCredentialAdapter from "./src/infrastructure/adapters/create.user.credential.adapter";
// import CreateIdentityAdapter from "./src/infrastructure/adapters/create.user.identity.adapter";
import FindCompanyByOwnerIdAdapter from "./src/infrastructure/adapters/find.company.by.owner.id.adapter";
// import RequestAdapter from "./src/infrastructure/adapters/request.adapter";
import UserOtpSecretReadRepository from "./src/infrastructure/repositories/user.otp.secret.read.repository";
import UserOtpSecretWriteRepository from "./src/infrastructure/repositories/user.otp.secret.write.repository";
import UserRepository from "./src/infrastructure/repositories/user.write.repository";
import UserController from "./src/presentation/controllers/user.controller";
import UserReadRepository from "./src/infrastructure/repositories/user.read.repository";
import UserWriteRepository from "./src/infrastructure/repositories/user.write.repository";
import CreateUserUseCase from "./src/application/useCases/create.user.use.case";
// import FindUserEmailByUserIdAdapter from "./src/infrastructure/adapters/find.user.email.by.user.id.adapter";
// import InviteJoinCompanyByEmailUseCase from "./src/application/useCases/invite.join.company.by.email.use.case";
import FindUserByIdUseCase from "./src/application/useCases/find.user.by.id.use.case";
import CreateUserService from "./src/domain/services/create.user.service";
import UserIdentityReadRepository from "./src/infrastructure/repositories/user.identity.read.repository";
import { BcryptAdapter } from "./src/infrastructure/adapters/bcrypt.adapter";
import GetAllUsersUseCase from "./src/application/useCases/get.all.users.use.case";
import GetOneUserUseCase from "./src/application/useCases/get.one.user.use.case";
import DeleteUserUseCase from "./src/application/useCases/delete.user.use.case";
import InitiateEmailIdvUseCase from "./src/application/useCases/initiate.email.idv.use.case";
import CompleteEmailIdvUseCase from "./src/application/useCases/complete.email.idv.use.case";
import UserIdentityWriteRepository from "./src/infrastructure/repositories/user.identity.write.repository";
import GetUserOtpSecretService from "./src/domain/services/get.user.otp.secret.service";
import TotpAdapter from "./src/infrastructure/adapters/totp.adapter";
import IdvReadRepository from "./src/infrastructure/repositories/idv.read.repository";
import IdvWriteRepository from "./src/infrastructure/repositories/idv.write.repository";
import CompanyInvitationRequestReadRepository from "./src/infrastructure/repositories/company.invitation.request.read.repository";
import CompanyInvitationRequestWriteRepository from "./src/infrastructure/repositories/company.invitation.request.write.repository";
import InviteUserToCompanyUseCase from "./src/application/useCases/invite.user.to.company.use.case";
import CreateOrUpdateUserNotificationTokenUseCase from "./src/application/useCases/create.or.update.user.notification.token.use.case";
import UserNotificationTokenWriteRepository from "./src/infrastructure/repositories/user.notification.token.write.repository";
import FindUserByEmailService from "./src/domain/services/find.user.by.email.service";
import AcceptCompanyInvitationUseCase from "./src/application/useCases/accept.company.invitation.use.case";
import RespondToCompanyInvitationUseCase from "./src/application/useCases/respond.to.company.invitation.use.case";
import GetUserProfileUseCase from "./src/application/useCases/get.user.profile.use.case";

@Module({
        imports: [
                DatabaseModule,
                forwardRef(() => SharedModule),
                forwardRef(() => PerformanceModule),
                forwardRef(() => OrderModule),
                forwardRef(() => CompanyModule),
                VehicleModule,
                AuthModule,
        ],
        controllers: [
                UserController,
        ],
        providers: [
                UserRepository,
                UserReadRepository,
                UserWriteRepository,
                UserIdentityReadRepository,
                UserIdentityWriteRepository,
                UserIdentityReadRepository,
                IdvReadRepository,
                IdvWriteRepository,
                CompanyInvitationRequestReadRepository,
                CompanyInvitationRequestWriteRepository,
                UserNotificationTokenWriteRepository,
                FindOneUserByIdService,
                CreateUserUseCase,
                // GetUserDetailUseCase,
                FindCompanyByOwnerIdAdapter,
                HotpAdapter,
                OtpSecretAdapter,
                UserOtpSecretReadRepository,
                UserOtpSecretWriteRepository,
                UserReadRepository,
                AcceptCompanyInvitationUseCase,
                RespondToCompanyInvitationUseCase,
                FindUserByIdUseCase,
                CreateUserService,
                GetUserOtpSecretService,
                BcryptAdapter,
                TotpAdapter,
                GetAllUsersUseCase,
                GetOneUserUseCase,
                DeleteUserUseCase,
                InitiateEmailIdvUseCase,
                CompleteEmailIdvUseCase,
                InviteUserToCompanyUseCase,
                CreateOrUpdateUserNotificationTokenUseCase,
                FindUserByEmailService,
                GetUserProfileUseCase,
        ],
        exports: [
                UserRepository,
                FindOneUserByIdService,
                // GetUserDetailUseCase,
                UserReadRepository,
                FindUserByIdUseCase,
                UserIdentityReadRepository,
                CreateUserUseCase,
        ],
})
export default class UserModule {
};

