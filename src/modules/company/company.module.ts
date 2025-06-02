import { forwardRef, Inject, Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import SharedModule from "../shared/shared.module";
import IEventDispatcher from "../shared/src/application/contracts/i.event.dispatcher";
import { EventDispatcher } from "../shared/src/infrastructure/event.dispatcher";
// import UserEvaluationCreatedHandler from "./src/application/eventHandlers/user.evaluation.created.handler";
import AddMemberToCompanyUseCase from "./src/application/useCases/add.member.to.company.use.case";
import FindCompanyByOwnerIdUseCase from "./src/application/useCases/find.company.by.owner.use.case";
// import UpdateCompanyScoreService from "./src/domain/services/update.company.score.service";
import CreateCompanyUseCase from "./src/application/useCases/create.company.use.case";
import FindOneCompanyByIdUseCase from "./src/application/useCases/find.one.company.by.id.use.case";
import CompanyMemberReadRepository from "./src/infrastructure/repositories/company.member.read.repository";
import CompanyRoleReadRepository from "./src/infrastructure/repositories/company.member.role.read.repository";
import CompanyMemberWriteRepository from "./src/infrastructure/repositories/company.member.write.repository";
import CompanyReadRepository from "./src/infrastructure/repositories/company.read.repository";
import CompanyWriteRepository from "./src/infrastructure/repositories/company.write.repository";
import DoesCompanyExistRepository from "./src/infrastructure/repositories/does.company.exist.repository";
import CompanyController from "./src/presentation/company.controller";
import FindCompanyVehiclesUseCase from "./src/application/useCases/find.company.vehicles.use.case";
import UpdateCompanyUseCase from "./src/application/useCases/update.company.use.case";
import FindCompanyMemberService from "./src/domain/services/find.company.member.service";

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
            // UserEvaluationCreatedHandler,
            // UpdateCompanyScoreService,
            DoesCompanyExistRepository,
            CompanyReadRepository,
            CompanyWriteRepository,
            FindCompanyMemberService,
            FindCompanyByOwnerIdUseCase,
            AddMemberToCompanyUseCase,
            CreateCompanyUseCase,
            FindOneCompanyByIdUseCase,
            FindCompanyVehiclesUseCase,
            UpdateCompanyUseCase,
        ],
        exports: [
            CompanyReadRepository,
            CompanyWriteRepository,
            FindCompanyByOwnerIdUseCase,
            AddMemberToCompanyUseCase,
        ]
    }
)
export default class CompanyModule {

    public constructor(
        @Inject(EventDispatcher)
        private readonly eventDispatcher: IEventDispatcher,
        // @Inject(UserEvaluationCreatedHandler)
        // private readonly userEvaluationCreatedHandler: IEventHandler,
    ) { };

    // public onModuleInit() {

    //     this.eventDispatcher.register(
    //         UserEvaluationCreatedEvent.eventName,
    //         this.userEvaluationCreatedHandler,
    //     );

    // };

};