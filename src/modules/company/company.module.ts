import { forwardRef, Inject, Module, OnModuleInit } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import UserEvaluationCreatedEvent from "../performance/src/domain/events/user.evaluation.created.event";
import SharedModule from "../shared/shared.module";
import IEventDispatcher from "../shared/src/application/contracts/i.event.dispatcher";
import IEventHandler from "../shared/src/application/contracts/i.event.handler";
import { EventDispatcher } from "../shared/src/infrastructure/event.dispatcher";
import UserEvaluationCreatedHandler from "./src/application/eventHandlers/user.evaluation.created.handler";
import AddMemberToCompanyUseCase from "./src/application/useCases/add.member.to.company.use.case";
import CreateCompanyUseCase from "./src/application/useCases/create.company.use.case";
import FindCompanyByOwnerIdUseCase from "./src/application/useCases/find.company.by.owner.use.case";
import FindCompanyDriversUseCase from "./src/application/useCases/find.company.drivers.use.case";
import FindCompanyVehiclesUseCase from "./src/application/useCases/find.company.vehicles.use.case";
import FindOneCompanyByIdUseCase from "./src/application/useCases/find.one.company.by.id.use.case";
import UpdateCompanyUseCase from "./src/application/useCases/update.company.use.case";
import FindCompanyMemberService from "./src/domain/services/find.company.member.service";
import UpdateCompanyScoreService from "./src/domain/services/update.company.score.service";
import CompanyMemberReadRepository from "./src/infrastructure/repositories/company.member.read.repository";
import CompanyRoleReadRepository from "./src/infrastructure/repositories/company.member.role.read.repository";
import CompanyMemberWriteRepository from "./src/infrastructure/repositories/company.member.write.repository";
import CompanyReadRepository from "./src/infrastructure/repositories/company.read.repository";
import CompanyScoreRepository from "./src/infrastructure/repositories/company.score.repository";
import CompanyWriteRepository from "./src/infrastructure/repositories/company.write.repository";
import DoesCompanyExistRepository from "./src/infrastructure/repositories/does.company.exist.repository";
import CompanyMemberRoleSeed from "./src/infrastructure/seeds/company.member.role.seed";
import CompanyController from "./src/presentation/company.controller";

@Module(
    {
        imports: [
            DatabaseModule,
            forwardRef(() => SharedModule),
        ],
        controllers: [
            CompanyController,
        ],
        providers: [
            CompanyMemberReadRepository,
            CompanyRoleReadRepository,
            CompanyMemberWriteRepository,
            DoesCompanyExistRepository,
            CompanyScoreRepository,
            CompanyMemberRoleSeed,
            UserEvaluationCreatedHandler,
            UpdateCompanyScoreService,
            DoesCompanyExistRepository,
            CompanyReadRepository,
            CompanyWriteRepository,
            FindCompanyMemberService,
            FindCompanyByOwnerIdUseCase,
            AddMemberToCompanyUseCase,
            CreateCompanyUseCase,
            FindOneCompanyByIdUseCase,
            FindCompanyVehiclesUseCase,
            FindCompanyDriversUseCase,
            UpdateCompanyUseCase,
            UpdateCompanyScoreService,
        ],
        exports: [
            CompanyReadRepository,
            CompanyWriteRepository,
            FindCompanyByOwnerIdUseCase,
            AddMemberToCompanyUseCase,
        ]
    }
)
export default class CompanyModule implements OnModuleInit {

    public constructor(
        @Inject(EventDispatcher)
        private readonly eventDispatcher: IEventDispatcher,
        @Inject(UserEvaluationCreatedHandler)
        private readonly userEvaluationCreatedHandler: IEventHandler,
        private readonly companyMemberRoleSeed: CompanyMemberRoleSeed,
    ) { };

    public async onModuleInit() {

        await this.companyMemberRoleSeed.up();

        this.eventDispatcher.register(
            UserEvaluationCreatedEvent.eventName,
            this.userEvaluationCreatedHandler,
        );

    };

};